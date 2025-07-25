const { Queue, QueueScheduler } = require('bullmq');
const IORedis = require('ioredis');
require('dotenv').config()

const REDIS_URL = process.env.REDIS_URL;

const client = new IORedis(REDIS_URL);

const medicationReminderQueue = new Queue('reminder', { client });
const providerSummaryQueue = new Queue('summary', { client });

new QueueScheduler('reminder', { client });
new QueueScheduler('summary', { client });

module.exports = { medicationReminderQueue, providerSummaryQueue }
