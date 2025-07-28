const { StatusCodes } = require('http-status-codes');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function requireAuth(req, res, next) {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED);
    }

    try {
        const payload = await jwt.verify(token, JWT_SECRET_KEY);
        req.user = { id: payload.id }
        return next();
    } catch (e) {
        res.status(StatusCodes.UNAUTHORIZED).json(e.message);
    }
}

module.exports = requireAuth;
