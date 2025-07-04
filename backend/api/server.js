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

server.get('/', async (req, res, next) => {
    res.status(200).json(`Hello World!`);
});

module.exports = server;
