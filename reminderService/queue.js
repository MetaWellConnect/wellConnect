const { Queue } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config()

const REDIS_URL = process.env.REDIS_URL;

const medicationReminderQueue = new Queue('reminder', {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
const providerSummaryQueue = new Queue('summary', {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

module.exports = { medicationReminderQueue, providerSummaryQueue }
