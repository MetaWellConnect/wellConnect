const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient({
    omit: {
        user: {
            password_hash: true
        }
    }
});

const AccountTypes = {
    PATIENT: "PATIENT",
    PROVIDER: "PROVIDER"
}

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { areCredentialsValid, generateJWT, registerUser, getUserIdAndRole } = require('./auth.js');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const { StatusCodes } = require('http-status-codes')
const generateSuggestions  = require('./smartSchedulerUtils.js')

const MAX_AGE = 2592000;

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
const corsOptons = {
    origin: true,
    credentials: true,
};

server.use(cors(corsOptons));


/* --- Auth Endpoints --- */

server.post('/register', async (req, res, next) => {
    const { user } = req.body;
    const registeredSuccessfully = await registerUser(user);

    if (registeredSuccessfully) {
        return res.status(200).json("User registered successfully!");
    }
    return res.status(409).json("User could not be registered due to user already existing!");
});

server.post('/login', async (req, res, next) => {
    const { email, password } = req.body.user;

    if (await areCredentialsValid(email, password)) {
        const { id, role } = await getUserIdAndRole(email);
        const token = await generateJWT(email, id, role);

        res.cookie('token', token, { maxAge: MAX_AGE });
        return res.status(200).json("Successfully authenticated!");
    }
    return res.status(401).json("Invalid credentials!");
});

server.post('/logout', async (req, res, next) => {
    res.clearCookie('token');
    return res.status(200).json('User logged out!');
});


/* --- Patient Endpoints --- */

server.get('/patients/:patientId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { user: true }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    return res.status(200).json(patient);
});

server.get('/patients/:patientId/provider', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
            provider: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    if (!patient.provider) {
        return res.status(204).json(`No patient has no provider!`);
    }

    return res.status(200).json(patient.provider);
});

server.put('/patients/:patientId/provider', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const { providerId } = req.body;

    const patient = await prisma.patient.update({
        where: { id: patientId },
        include: { user: true },
        data: { provider_id: providerId }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    return res.status(200).json(patient);
});


/* --- Provider Endpoints --- */

server.get('/providers/:providerId', async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const provider = await prisma.provider.findUnique({
        where: { id: providerId },
        include: { user: true }
    });

    if (!provider) {
        return res.status(204).json(`No provider with id: ${providerId}`);
    }

    return res.status(200).json(provider);
});

server.get('/providers/:providerId/patients', async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const provider = await prisma.provider.findUnique({
        where: { id: providerId },
        include: {
            patients:
            {
                include: {
                    user: true
                }
            }
        }
    });

    if (!provider) {
        return res.status(204).json(`No provider with id: ${providerId}`);
    }

    return res.status(200).json(provider.patients);
});


/* --- Medication Endpoints --- */

server.get('/patients/:patientId/medications', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { medications: true }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    return res.status(200).json(patient.medications);
});

server.get('/patients/:patientId/medications/:medicationId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
    });

    if (!medication) {
        return res.status(204).json(`No medication with id: ${medicationId}`);
    }

    if (medication.patient_id != patientId) {
        return res.status(204).json(`No medication belonging to patient with id: ${patientId}`)
    }

    return res.status(200).json(medication);
});

server.get('/providers/:providerId/medicationsToApprove', async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const treatments = await prisma.provider.findUnique({
        where: { id: providerId },
        include: {
            treatments: {
                include: {
                    medications: true // Includes patient_id
                }
            }
        }
    });

    let medications = [];
    treatments.treatments.forEach((treatment) => {
        medications = [...medications, ...treatment.medications]
    });

    // Medications that have a null approved field have yet to be examined by the provider
    medications = medications.filter((medication) => medication.approved === null);

    return res.status(200).json(medications);
});

server.post('/patients/:patientId/medications', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const { name, description, strength, treatment_id } = req.body;
    const medicationData = {
        name,
        description,
        strength,
        patientId,
        treatment_id
    }

    try {
        const medication = await prisma.medication.create({
            data: {
                medicationData
            }
        });

        return res.status(200).json(medication);
    } catch (e) {
        return res.status(204).json(`Failed to create medication! Error: ${e.message}`);
    }
});

server.delete('/patients/:patientId/medications/:medicationId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
    });

    if (!medication) {
        return res.status(204).json(`No medication with id: ${medicationId}`);
    }

    if (medication.patient_id != patientId) {
        return res.status(204).json(`No medication belonging to patient with id: ${patientId}`)
    }

    await prisma.medication.delete({
        where: { id: medicationId }
    });

    return res.status(200).json(medication);
});

server.put('/patients/:patientId/medications/:medicationId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);

    const medicationInformation = req.body;

    try {
        const medication = await prisma.medication.update({
            where: { id: medicationId, patient_id: patientId },
            data: medicationInformation
        });

        return res.status(200).json(medication);
    } catch (e) {
        return res.status(204).json(`Failed to update medication! Error: ${e.message}`);
    }
});


/* --- Treatment Endpoints --- */

server.get('/patients/:patientId/treatment', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
            treatment: {
                include: {
                    medications: true
                }
            }
        }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    return res.status(200).json(patient.treatment);
});

server.put('/patients/:patientId/treatment', async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
            treatment: {
                include: {
                    medications: true
                }
            }
        }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    const treatment_id = patient.treatment_id;
    const treatmentInformation = req.body;

    try {
        const treatment = await prisma.treatment.update({
            where: { id: treatment_id },
            data: treatmentInformation
        });

        res.status(200).json(treatment);
    } catch (e) {
        res.status(204).json(`Failed to update treatment! Error: ${e.message}`)
    }

});

/* --- Appointment Endpoints --- */

server.get('/providers/:providerId/appointments', async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const patientId = Number(req.query.patientId);
    const role = req.query.role;

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                provider_id: providerId
            },
            include: {
                provider: {
                    include: {
                        user: true
                    }
                },
                patient: {
                    include: {
                        user: true
                    }
                }
            }
        });

        if (appointments.length === 0) {
            return res.status(StatusCodes.NO_CONTENT);
        }

        // Censor outgoing information if requestor is a patient
        if (role === AccountTypes.PATIENT) {
            appointments.filter((appointment) => {
                if (appointment.patient.id !== patientId) {
                    return appointment.patient = null;
                }
                return appointment;
            });
        }

        return res.status(StatusCodes.OK).json(appointments);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to retrieve appointments! Error: ${e.message}`)
    }
});

server.get('/providers/:providerId/appointments/suggested', async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const duration = Number(req.query.duration);


        const suggestions = await generateSuggestions(providerId, duration);
        return res.status(StatusCodes.OK).json(suggestions);

});


/* --- Catch All Endpoints --- */

server.get('/', async (req, res, next) => {
    res.status(200).json(`Hello World!`);
});

module.exports = server;
