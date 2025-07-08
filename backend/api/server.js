const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { areCredentialsValid, generateJWT, registerUser, getUserIdAndRole } = require('./auth.js');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

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
        include: { user: true }
    });

    if (!patient) {
        return res.status(204).json(`No patient with id: ${patientId}`);
    }

    const providerId = patient.provider_id;
    const provider = await prisma.provider.findUnique({
        where: { id: providerId },
        include: { user: true }
    });

    if (!provider) {
        return res.status(204).json(`No provider with id: ${providerId}`);
    }

    return res.status(200).json(provider);
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

    patient.provider_id = provider_id;
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
        include: { patients: true }
    });

    if (!provider) {
        return res.status(204).json(`No provider with id: ${providerId}`);
    }

    return res.status(200).json(provider);
});


/* --- Medication Endpoints --- */

server.get('/patients/:patientId/medications', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});

server.get('/patients/:patientId/medications/:medicationId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});

server.post('/patients/:patientId/medications', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});

server.delete('/patients/:patientId/medications/:medicationId', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});

server.put('/patients/:patientId/medications', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});


/* --- Treatment Endpoints --- */

server.get('/patients/:patientId/treatment', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});

server.put('/patients/:patientId/treatment', async (req, res, next) => {
    const patientId = Number(req.params.patientId);

});


/* --- Catch All Endpoints --- */

server.get('/', async (req, res, next) => {
    res.status(200).json(`Hello World!`);
});

module.exports = server;
