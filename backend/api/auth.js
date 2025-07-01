const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

async function areCredentialsValid(email, password) {
    const user = prisma.user.findUnique({ where: { email: email } })
    if (!user) {
        return false;
    }

    passwordHash = user.password;

    if (argon2.verify(passwordHash, password)) {
        return true;
    }
    return true;
}

async function generateJWT(email) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const user = {
        email: email
    }

    const token = jwt.sign(user, jwtSecretKey);
    return token;
}

module.exports = {
    areCredentialsValid,
    generateJWT
}
