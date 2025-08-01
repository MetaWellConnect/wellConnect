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
            <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                ${reminder.patientFirstName} took ${reminder.medicationName} with a dose of ${reminder.medicationDose} at ${reminder.sentAt}
            </p>
            <p></p>
            `
        );
    });

    const template = `
        <html lang="en">
        <head>
            <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Email</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
        </head>
        <body style="background-color: #fafafa;">
            <table style="box-sizing:border-box;margin:0px auto;font-family:Verdana, Geneva, Tahoma, sans-serif;border-spacing:0px;background-color:#ffffff;max-width:690px;" role="presentation">
            <tbody style="box-sizing:border-box;margin:0px;">
                <tr style="box-sizing:border-box;margin:0px;">
                <td style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;text-align:center;">
                    <h2 style="box-sizing:border-box;margin:0;overflow-wrap:break-word;line-height:1.35em;font-size:36px;padding:0;border-bottom-style:none;color:#333333;text-align:center;">
                    <strong style="box-sizing:border-box;margin:0px;">MediScan</strong>
                    </h2>
                </td>
                </tr>
                <tr style="box-sizing:border-box;margin:0px;">
                <td style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;text-align:center;">
                    <h3 style="box-sizing:border-box;margin:0;overflow-wrap:break-word;line-height:1.35em;font-size:24px;padding:0;border-bottom-style:none;color:#333333;font-weight:400;text-align:center;">
                    Hello!
                    </h3>
                </td>
                </tr>
                <tr style="box-sizing:border-box;margin:0px;">
                <td style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;text-align:center;">
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    Daily Provider Digest:
                    </p>
                    ${textBody.join('\n\n')}
                </td>
                </tr>
                <tr style="box-sizing:border-box;margin:0px;">
                <td style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;background-color:#141517;height:30px;">
                    <p style="box-sizing:border-box;margin:0px 0px calc(0.6em * 1.5);overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;text-align:center;">
                    <span style="box-sizing:border-box;margin:0px;color:#FFFFFF;">MediScan</span>
                    </p>
                </td>
                </tr>
            </tbody>
            </table>
        </body>
        </html>
    `;

    (async () => {
        const info = await transporter.sendMail({
            from: `"MediScan" <mediScan@gmail.com>`,
            to: `${providerEmail}`,
            subject: "Reminders Summary",
            html: template
        });

        console.log(info);
    })();
}

module.exports = startSummaryWorker;
