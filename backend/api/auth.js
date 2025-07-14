const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
require('dotenv').config()

/**
 * This function takes the user information and attempts to register it
 * If the user already exists according to their unique identifier (email) the registration fails
 * @param {*} user The information of the user to register
 * @returns Boolean that indicates if the user was successfully registered
 */
async function registerUser(user) {
    const userInDatabase = await prisma.user.findUnique({ where: { email: user.email } });

    if (userInDatabase) {
        return false;
    }

    const passwordHash = await argon2.hash(user.password);
    const createdUser = await prisma.user.create({
        data: {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password_hash: passwordHash,
            role: user.accountType
        }
    });

    if (user.accountType === "PATIENT") {
        await prisma.patient.create({
            data: {
                id: createdUser.id
            }
        });

        return true;
    }

    if (user.accountType === "PROVIDER") {
        await prisma.provider.create({
            data: {
                id: createdUser.id
            }
        });

        return true;
    }

    return false;
}

/**
 * Takes an email and password and validates the credentials with the users in the database
 * @param {String} email    The email the user logged in with
 * @param {String} password The password the user logged in with
 * @returns Boolean that indicates if the credentials are valid
 */
async function areCredentialsValid(email, password) {
    const user = await prisma.user.findUnique({ where: { email: email } })
    if (!user) {
        return false;
    }

    const passwordHash = user.password_hash;

    if (await argon2.verify(passwordHash, password)) {
        return true;
    }
    return false;
}

/**
 * This function takes an email and returns the id and role of the user that email belongs to
 * @param {String} email The email of the user to find the role and id of
 * @returns
 */
async function getUserIdAndRole(email) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        throw new Error(`User with email ${email} not found!`);
    }

    const id = user.id;
    const role = user.role;

    return { role, id };
}

/**
 * Generates a JWT with the user's information
 * @param {String} email    Email to be enconded in the JWT
 * @param {int} id          Id to be enconded in the JWT
 * @param {String} role     Role to be enconded in the JWT
 * @returns A JWT token
 */
async function generateJWT(email, id, role) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const payload = {
        email,
        id,
        role
    }

    const token = jwt.sign(payload, jwtSecretKey);
    return token;
}

module.exports = {
    areCredentialsValid,
    generateJWT,
    registerUser,
    getUserIdAndRole
}
