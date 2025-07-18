const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const DateFns = require('date-fns');

async function generateSuggestions(providerId, appointmentDuration) {
    const preferences = await prisma.providerPreferences.findUnique({
        where: {
            provider_id: providerId
        }
    });

    if (!preferences) {
        throw new Error(`No preferences found for provider with id ${providerId}`);
    }

    const horizonLimit = preferences.future_appointment_limit;
    const availableDays = preferences.available_days;
    const providerStartHour = preferences.start_hour;
    const providerEndHour = preferences.end_hour;
    const maxAppointmentsPerDay = preferences.max_appointments_per_day;
    const minBufferMinutes = preferences.min_buffer_minutes;
    const timezone = preferences.timezone;

    const today = new Date();
    const daysRangeStart = DateFns.startOfDay(DateFns.addMinutes(today, minBufferMinutes));
    const daysRangeEnd = DateFns.endOfDay(DateFns.addDays(today, horizonLimit));

    const appointments = await prisma.appointment.findMany({
        where: {
            provider_id: providerId,
            date: {
                gte: daysRangeStart,
                lte: daysRangeEnd
            },
            orderBy: {date: 'asc'}
        }
    });

    // It can be expected for providers to have no appointments
    // If there are no appointments, return no suggestions
    if (!appointments) {
        return [];
    }

    const busyIntervals = getBusyIntervals(appointments, minBufferMinutes, daysRangeStart, daysRangeEnd);
    const mergedBusyIntervals = mergeBusyIntervals(busyIntervals);
    const availableIntervals = getAvailableIntervalsFromBusyIntervals(mergedBusyIntervals, daysRangeStart, daysRangeEnd);
    const timeSlots= createTimeSlotsFromAvailableIntervals(availableIntervals);
    const validStartTimes = findValidStartTimes(timeSlots, appointmentDuration);

    const timeSlotsWithScore = validStartTimes.map((timeSlot) => {
        return({
            timeSlot,
            score: getTimeSlotScore(timeSlot, appointmentDuration, appointments)
        })
    });
}

function getBusyIntervals(appointments, minBufferMinutes, daysRangeStart, daysRangeEnd) {

}

function mergeBusyIntervals(busyIntervals) {

}

function getAvailableIntervalsFromBusyIntervals(mergedBusyIntervals, daysRangeStart, daysRangeEnd) {

}

function createTimeSlotsFromAvailableIntervals(availableIntervals) {

}

function findValidStartTimes(timeSlots, appointmentDuration) {

}

function getTimeSlotScore(timeSlot, appointmentDuration, appointments) {

}

module.exports = {
    generateSuggestions
}
