require('dotenv').config();

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

const { Client } = require('minio');
const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_USER,
    secretKey: process.env.MINIO_PASSWORD
});

const { v4: uuidv4 } = require('uuid');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const cors = require('cors');
const { areCredentialsValid, generateJWT, registerUser, getUserIdAndRole } = require('./auth.js');
const { parseOCRText, runOCROnImage } = require('./utils.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const reminderServiceUtils = require('./reminderServiceUtils.js');
const generateSuggestions = require('./smartSchedulerUtils.js');
const requireAuth = require('./authMiddleware.js');
const { body, param, validationResult } = require(`express-validator`);

const MAX_AGE = 2592000;
const upload = multer({ storage: multer.memoryStorage() });

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
const corsOptons = {
    origin: true,
    credentials: true,
};

server.use(cors(corsOptons));

/* --- OCR Endpoints --- */

server.post('/medications/run-ocr', upload.single('medicationImage'), async (req, res, next) => {
    const medicationImage = req.file;

    if (!medicationImage) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json("No medication image uploaded!");
    }

    try {
        const ocrText = await runOCROnImage(medicationImage); // Extract text on image
        const processedOCRText = await parseOCRText(ocrText); // Extract the name and strength of the medication
        return res.status(StatusCodes.OK).json(processedOCRText);
    } catch (e) {
        return res.status(e.status).json(e.message);
    }
});

/* --- Auth Endpoints --- */

server.post('/register', async (req, res, next) => {
    const { user } = req.body;
    const registeredSuccessfully = await registerUser(user);

    if (registeredSuccessfully) {
        return res.status(StatusCodes.OK).json("User registered successfully!");
    }
    return res.status(StatusCodes.CONFLICT).json("User could not be registered due to user already existing!");
});

server.post('/login', async (req, res, next) => {
    const { email, password } = req.body.user;

    if (await areCredentialsValid(email, password)) {
        const { id, role } = await getUserIdAndRole(email);
        const token = await generateJWT(email, id, role);

        res.cookie('token', token, { maxAge: MAX_AGE, saneSite: 'none' });
        return res.status(StatusCodes.OK).json("Successfully authenticated!");
    }
    return res.status(StatusCodes.UNAUTHORIZED).json("Invalid credentials!");
});

server.post('/logout', async (req, res, next) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json('User logged out!');
});


/* --- Patient Endpoints --- */

server.get('/patients/:patientId', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { user: true }
    });

    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(patient);
});

server.get('/patients/:patientId/provider', requireAuth, async (req, res, next) => {
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
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    if (!patient.provider) {
        return res.status(StatusCodes.NOT_FOUND).json(`This patient has no provider!`);
    }

    return res.status(StatusCodes.OK).json(patient.provider);
});

server.put('/patients/:patientId/provider', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const { providerId } = req.body;

    const patient = await prisma.patient.update({
        where: { id: patientId },
        include: { user: true },
        data: { provider_id: providerId }
    });

    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(patient);
});


/* --- Provider Endpoints --- */

server.get('/providers/:providerId', requireAuth, async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const provider = await prisma.provider.findUnique({
        where: { id: providerId },
        include: { user: true }
    });

    if (!provider) {
        return res.status(StatusCodes.NOT_FOUND).json(`No provider with id: ${providerId}`);
    }

    return res.status(StatusCodes.OK).json(provider);
});

server.get('/providers/:providerId/patients', requireAuth, async (req, res, next) => {
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
        return res.status(StatusCodes.NOT_FOUND).json(`No provider with id: ${providerId}`);
    }

    return res.status(StatusCodes.OK).json(provider.patients);
});


/* --- Medication Endpoints --- */

server.get('/patients/:patientId/medications', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { medications: true }
    });

    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(patient.medications);
});

server.get('/patients/:patientId/medications/approved', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const patient = await prisma.patient.findUnique({
        where: {
            id: patientId,
        },
        include: {
            medications: {
                where: {
                    approved: true
                }
            }
        }
    });

    if (!patient) {
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(patient.medications);
});


server.get('/patients/:patientId/medications/:medicationId', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
    });

    if (!medication) {
        return res.status(StatusCodes.NOT_FOUND).json(`No medication with id: ${medicationId}`);
    }

    if (medication.patient_id != patientId) {
        return res.status(StatusCodes.NOT_FOUND).json(`No medication belonging to patient with id: ${patientId}`)
    }

    return res.status(StatusCodes.OK).json(medication);
});

server.get('/providers/:providerId/medicationsToApprove', requireAuth, async (req, res, next) => {
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

    return res.status(StatusCodes.OK).json(medications);
});

server.post('/patients/:patientId/medications', [
    param('patientId').exists().withMessage('Patient ID required!').isInt().withMessage('PatientId must be an int!'),
], upload.single('image'), requireAuth, async (req, res, next) => {
    if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json('Medication image missing!');
    }

    try {
        const patient_id = Number(req.params.patientId);
        const { name, strength } = req.body;

        const patient = await prisma.patient.findUnique({
            where: {
                id: patient_id
            }
        });
        const treatment_id = patient.treatment_id;


        const bucket = 'medication-images';
        const extension = path.extname(req.file.originalname);
        const key = `${uuidv4()}${extension}`;
        await minioClient.putObject(bucket, key, req.file.buffer, {
            'Content-Type': req.file.mimetype
        });

        const medicationData = {
            name,
            strength,
            patient_id,
            treatment_id,
            photo_url: `http://localhost:9000/${bucket}/${key}`
        }

        const medication = await prisma.medication.create({
            data: medicationData
        });

        return res.status(StatusCodes.OK).json(medication);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to create medication! Error: ${e.message}`);
    }
});

server.delete('/patients/:patientId/medications/:medicationId', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);
    const medication = await prisma.medication.findUnique({
        where: { id: medicationId },
    });

    if (!medication) {
        return res.status(StatusCodes.NOT_FOUND).json(`No medication with id: ${medicationId}`);
    }

    if (medication.patient_id != patientId) {
        return res.status(StatusCodes.NOT_FOUND).json(`No medication belonging to patient with id: ${patientId}`)
    }

    await prisma.medication.delete({
        where: { id: medicationId }
    });

    return res.status(StatusCodes.OK).json(medication);
});

server.put('/patients/:patientId/medications/:medicationId', requireAuth, async (req, res, next) => {
    const patientId = Number(req.params.patientId);
    const medicationId = Number(req.params.medicationId);

    const medicationInformation = req.body;

    try {
        const medication = await prisma.medication.update({
            where: { id: medicationId, patient_id: patientId },
            data: medicationInformation
        });

        return res.status(StatusCodes.OK).json(medication);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to update medication! Error: ${e.message}`);
    }
});


/* --- Treatment Endpoints --- */

server.get('/patients/:patientId/treatment', requireAuth, async (req, res, next) => {
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
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(patient.treatment);
});

server.put('/patients/:patientId/treatment', requireAuth, async (req, res, next) => {
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
        return res.status(StatusCodes.NOT_FOUND).json(`No patient with id: ${patientId}`);
    }

    const treatment_id = patient.treatment_id;
    const treatmentInformation = req.body;

    try {
        const treatment = await prisma.treatment.update({
            where: { id: treatment_id },
            data: treatmentInformation
        });

        res.status(StatusCodes.OK).json(treatment);
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).json(`Failed to update treatment! Error: ${e.message}`)
    }

});

/* --- Reminder Endpoints --- */

server.get('/medications/due', async (req, res, next) => {
    const currentTime = new Date();
    try {
        const medicationsDue = await prisma.medication.findMany({
            where: {
                time_of_next_dose: {
                    lte: currentTime
                }
            },
            include: {
                patient: {
                    include: {
                        user: true
                    }
                }
            }
        });

        res.status(StatusCodes.OK).json(medicationsDue);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to retrieve medications due for reminders! Error: ${e.message}`);
    }
});

server.put('/medications/:medicationId/due', async (req, res, next) => {
    const medicationId = Number(req.params.medicationId);
    const medication = await prisma.medication.findUnique({
        where: {
            id: medicationId
        }
    });

    if (!medication) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to retrieve medication with id: ${medicationId}!`);
    }

    const patientId = medication.patient_id;
    const patient = await prisma.patient.findUnique({
        where: {
            id: patientId
        },
        include: {
            user: true,
        }
    })

    const providerId = patient.provider_id;
    const provider = await prisma.provider.findUnique({
        where: {
            id: providerId
        },
        include: {
            user: true
        }
    })

    await reminderServiceUtils.updateMedicationDueReminders(medication);

    try {
        const reminder = await prisma.sentReminders.create({
            data: {
                provider_id: provider.id,
                provider_email: provider.user.email,
                patient_first_name: patient.user.first_name,
                patient_last_name: patient.user.last_name,
                medication_name: medication.name,
                medication_dose: medication.dose
            }
        });

        return res.status(StatusCodes.OK).json(reminder);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to retrieve create reminder log! Error: ${e.message}`);
    }
});

server.get('/reminders/sent', async (req, res, next) => {
    const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

    const sinceTime = Date.now() - DAY_IN_MILLISECONDS; // Time of 24hrs ago
    const reminder = await prisma.sentReminders.findMany({
        where: {
            sent_at: {
                gte: new Date(sinceTime)
            }
        }
    });

    if (!reminder) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to retrieve sent reminders!`);
    }

    const summaryByProvider = {};
    reminder.forEach((reminder) => {
        if (!summaryByProvider[reminder.provider_id]) {
            summaryByProvider[reminder.provider_id] = {
                providerEmail: reminder.provider_email,
                reminders: []
            };
        }

        summaryByProvider[reminder.provider_id].reminders.push({
            sentAt: reminder.sent_at,
            patientFirstName: reminder.patient_first_name,
            patientLastName: reminder.patient_last_name,
            medicationName: reminder.medication_name,
            medicationDose: reminder.medication_dose
        });
    });

    res.status(StatusCodes.OK).json(summaryByProvider);
});

/* --- Appointment Endpoints --- */

server.get('/providers/:providerId/appointments', requireAuth, async (req, res, next) => {
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
            appointments.map((appointment) => {
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

server.get('/providers/:providerId/appointments/suggested', requireAuth, async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const duration = Number(req.query.duration);

    const suggestions = await generateSuggestions(providerId, duration);
    return res.status(StatusCodes.OK).json(suggestions);

});

server.post('/providers/:providerId/appointments/', requireAuth, async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const { patient_id, date, duration_in_minutes, name } = req.body;
    const appointmentInformation = {
        patient_id,
        provider_id: providerId,
        date,
        duration_in_minutes,
        name
    }

    try {
        const appointment = await prisma.appointment.create({
            data: appointmentInformation
        });
        return res.status(StatusCodes.OK).json(appointment);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(`Failed to create appointment! Error: ${e.message}`)

    }
});

/* --- Provider Preferences Endpoints --- */

server.get('/providers/:providerId/preferences/', requireAuth, async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const preferences = await prisma.providerPreferences.findUnique({
        where: {
            provider_id: providerId
        }
    });

    if (!preferences) {
        return res.status(StatusCodes.NOT_FOUND).json(`Failed to find provider preferences with providerId: ${providerId}`);
    }

    return res.status(StatusCodes.OK).json(preferences);
});

server.put('/providers/:providerId/preferences/', requireAuth, async (req, res, next) => {
    const providerId = Number(req.params.providerId);
    const providerPreferencesInfo = req.body;
    const preferences = await prisma.providerPreferences.update({
        where: { provider_id: providerId },
        data: providerPreferencesInfo
    });

    if (!preferences) {
        return res.status(StatusCodes.NOT_FOUND).json(`No provider preferences with provider_id: ${patientId}`);
    }

    return res.status(StatusCodes.OK).json(preferences);
});


/* --- Image Endpoints --- */

server.post('/images', upload.single('image'), async (req, res, next) => {
    try {
        const bucket = 'medication-images';
        const key = req.file.originalname;
        const url = await minioClient.putObject(bucket, key, req.file.buffer, {
            'Content-Type': req.file.mimetype
        });

        return res.status(StatusCodes.OK).json(url);
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
});


/* --- Catch All Endpoints --- */

server.get('/', async (req, res, next) => {
    res.status(StatusCodes.OK).json(`Hello World!`);
});

module.exports = server;
