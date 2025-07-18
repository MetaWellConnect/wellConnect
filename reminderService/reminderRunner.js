const { StatusCodes } = require('http-status-codes');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config()

const MEDISCAN_DB_API_URL = process.env.MEDISCAN_DB_API_URL;
const MEDISCAN_EMAIL_PASS = process.env.MEDISCAN_EMAIL_PASS
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"mediscanreminders@gmail.com",
        pass: MEDISCAN_EMAIL_PASS
    }
})

async function fetchWithErrorHandling(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = await response.json();
        const errorStatus = response.status;

        const error = new Error(errorMessage);
        error.status = errorStatus;
        throw error;
    }

    return response;
}

async function sendReminder(medication) {
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
                    Hello ${medication.patient.user.first_name}!
                    </h3>
                </td>
                </tr>
                <tr style="box-sizing:border-box;margin:0px;">
                <td style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;text-align:center;">
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    This is a friendly reminder to take your medication:
                    </p>
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    <strong style="box-sizing:border-box;margin:0px;">Medication: </strong>${medication.name}
                    </p>
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    <strong style="box-sizing:border-box;margin:0px;">Dosage:</strong> ${medication.dose}
                    </p>
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    Your next dose is scheduled for ${medication.frequency_in_hours} hour${medication.frequency_in_hours === 1 ? '' : 's'} from now!
                    </p>
                    <p style="box-sizing:border-box;margin:0px;overflow-wrap:break-word;max-width:none;padding-top:0.2em;font-size:1em;line-height:1.6em;color:#333333;">
                    <img style="box-sizing:border-box;margin:0px;display:inline;max-width:none;height:auto;vertical-align:middle;aspect-ratio:2000/2000;width:62.56%;" src="${medication.photo_url}" width="2000" height="2000">
                    </p>
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
            to: `${medication.patient.user.email}`,
            subject: "Medication Reminder",
            html: template
        });

        console.log(info);
    })();
}

cron.schedule('* * * * *', async () => {
    try {
        const response = await fetchWithErrorHandling(`${MEDISCAN_DB_API_URL}/medications/due`, {
            method: 'GET'
        });

        const medicationsDue = await response.json();
        medicationsDue.forEach((medication) => {
            sendReminder(medication);
        });
    } catch (e) {
        console.error(`Error fetching medications! Status:${e.status} Message: ${e.message}`);
    }
})
