const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { areCredentialsValid, generateJWT, registerUser } = require('./auth.js');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(cookieParser());


server.post('/register', async (req, res, next) => {
    const { user } = req.body;
    const registeredSuccessfully = await registerUser(user);

    if (registeredSuccessfully) {
        return res.status(200).json("User registered successfully!");
    }
    return res.status(400).json("User could not be registered!");
});

server.get('/login', async (req, res, next) => {
    const { email, password } = req.body.user;

    if (await areCredentialsValid(email, password)) {
        const token = await generateJWT(email);

        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ token }); // Returns the token in response, will be removed
    }
    return res.status(400).json("Invalid credentials!");
});

server.get('/', async (req, res, next) => {
    res.status(200).json(`Hello World, and!`);
});

module.exports = server;
