const { Queue } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config()

const REDIS_URL = process.env.REDIS_URL;

const medicationReminderQueue = new Queue('reminder', { connection: { url: REDIS_URL } });
const providerSummaryQueue = new Queue('summary', { connection: { url: REDIS_URL } });

module.exports = { medicationReminderQueue, providerSummaryQueue }
