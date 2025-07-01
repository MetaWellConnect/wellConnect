const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

/**
 * This function takes the user information and attempts to register it
 * If the user already exists according to their unique identifier (email) the registration fails
 * @param {*} user
 * @returns Boolean that indicates if the user was successfully registered
 */
async function registerUser(user) {
    const user = prisma.user.findUnique({ where: { email: user.email } })
    if (!user) {
        passwordHash = argon2.hash(user.password);
        prisma.user.create({
            data: {
                id: user.id,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                passwordHash: passwordHash
            }
        });

        return true;
    }

    return false;
}

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
    generateJWT,
    registerUser
}
