const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/login', async (req, res, next) => {
    const { email, password } = req.user;

    if (areCredentialsValid(email, password)) {
        const token = generateJWT();

        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({token}); // Returns the token in response, will be removed
    }
    res.status(400).json("Invalid credentials!");
});

server.get('/', async (req, res, next) => {
    res.status(200).json("Hello World!");
});

module.exports = server;
