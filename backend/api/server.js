const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { areCredentialsValid, generateJWT, registerUser } = require('./auth.js');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.post('/register', async (req, res, next) => {
    const { user } = req.body;
    const registeredSuccessfully = registerUser(user);

    if (registeredSuccessfully) {
        res.status(200).json("User registered successfully!");
    }
    res.status(400).json("User could not be registered!");
});

server.get('/login', async (req, res, next) => {
    const { email, password } = req.body.user;

    if (areCredentialsValid(email, password)) {
        const token = generateJWT(email);

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token }); // Returns the token in response, will be removed
    }
    res.status(400).json("Invalid credentials!");
});

server.get('/', async (req, res, next) => {
    res.status(200).json("Hello World!");
});

module.exports = server;
