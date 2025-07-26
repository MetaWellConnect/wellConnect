const { medicationReminderQueue } = require('../queue');
const { fetchWithErrorHandling } = require('../utils');
const DateFnsTz = require('date-fns-tz');
require('dotenv').config();

const MEDISCAN_DB_API_URL = process.env.MEDISCAN_DB_API_URL;

// Blackout would be 00:00 - 07:59
const REMINDER_BLACKOUT_START = 0;
const REMINDER_BLACKOUT_END = 8;

async function enqueueMedicationReminders() {
    const response = await fetchWithErrorHandling(`${MEDISCAN_DB_API_URL}/medications/due`);
    const medications = await response.json();

    medications.forEach(async (medication) => {
        const reminderTime = getMedicationSendTime(new Date(medication.time_of_next_dose), medication.patient.timezone);
        const delay = Math.max(reminderTime - Date.now(), 0);
        await medicationReminderQueue.add(
            'REMINDER',
            { medication },
            { delay: delay }
        );

        console.log(`Medication Reminder Queued for ${delay}!`);
    });

}

function getMedicationSendTime(reminderTimeUTC, timezone) {
    const reminderTimeLocal = DateFnsTz.toZonedTime(reminderTimeUTC, timezone);
    const hour = reminderTimeLocal.getHours();

    if (hour < REMINDER_BLACKOUT_END && hour >= REMINDER_BLACKOUT_START) {
        const correctedReminderTimeLocal = new Date(reminderTimeLocal);
        correctedReminderTimeLocal.setHours(REMINDER_BLACKOUT_END, 0, 0, 0);

        const correctedReminderTimeUTC = DateFnsTz.fromZonedTime(correctedReminderTimeLocal, timezone);
        return correctedReminderTimeUTC;
    }

    return reminderTimeUTC;
}

module.exports = enqueueMedicationReminders;
