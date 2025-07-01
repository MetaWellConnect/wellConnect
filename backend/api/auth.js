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
    const userInDatabase = await prisma.user.findUnique({ where: { email: user.email } });

    if (userInDatabase === null) {
        const passwordHash = await argon2.hash(user.password);
        await prisma.user.create({
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

/**
 * Takes an email and password and validates the credentials with the users in the database
 * @param {String} email
 * @param {String} password
 * @returns Boolean that indicates if the credentials are valid
 */
async function areCredentialsValid(email, password) {
    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user) {
        return false;
    }

    const passwordHash = user.passwordHash;

    if (await argon2.verify(passwordHash, password)) {
        return true;
    }
    return false;
}

/**
 * Generates a JWT with the user's information
 * @param {String} email
 * @returns A JWT token
 */
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
