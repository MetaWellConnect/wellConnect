const { providerSummaryQueue } = require('../queue');
const nodemailer = require('nodemailer');
const { Worker } = require('bullmq');
require('dotenv').config()

const MEDISCAN_EMAIL_PASS = process.env.MEDISCAN_EMAIL_PASS
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mediscanreminders@gmail.com",
        pass: MEDISCAN_EMAIL_PASS
    }
})

function startSummaryWorker() {
    new Worker('summary', async job => {
        const { summary } = job.data;
        const providerEmail = summary.providerEmail;
        const reminders = summary.reminders
        sendReminder(providerEmail, reminders);
    }, {
        connection: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }, concurrency: 5
    });
}

async function sendReminder(providerEmail, reminders) {
    const textBody = reminders.map((reminder) => {
        return (
            `
            ${reminder.patientFirstName} took ${reminder.medicationName} with a dose of ${reminder.medicationDose} at ${reminder.sentAt}
            `
        );
    });

    (async () => {
        const info = await transporter.sendMail({
            from: `"MediScan" <mediScan@gmail.com>`,
            to: `${providerEmail}`,
            subject: "Reminders Summary",
            text: textBody.join('\n - ')
        });

        console.log(info);
    })();
}

module.exports = startSummaryWorker;
