const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { fromZonedTime } = require('date-fns-tz');
const dateFnsTz = require('date-fns-tz');
const DateFns = require('date-fns');

const SLOT_DURATION = 15;

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
    const leadTimeMin = preferences.appointment_lead_time_min
    const availableDays = preferences.available_days;
    const providerStartHour = preferences.start_hour;
    const providerEndHour = preferences.end_hour;
    const maxAppointmentsPerDay = preferences.max_appointments_per_day;
    const minBufferMinutes = preferences.min_buffer_minutes;
    const providerTimezone = preferences.timezone;

    const today = new Date();
    const daysRangeStart = DateFns.startOfDay(DateFns.addMinutes(today, minBufferMinutes));
    const daysRangeEnd = DateFns.endOfDay(DateFns.addDays(today, horizonLimit));

    const appointments = await prisma.appointment.findMany({
        where: {
            provider_id: providerId,
            date: {
                gte: daysRangeStart,
                lte: daysRangeEnd
            }
        },
        orderBy: { date: 'asc' }
    });

    const busyIntervals = getBusyIntervals(appointments, availableDays, providerStartHour, providerEndHour, minBufferMinutes, daysRangeStart, daysRangeEnd, maxAppointmentsPerDay, leadTimeMin, providerTimezone);
    const mergedBusyIntervals = mergeBusyIntervals(busyIntervals);
    const availableIntervals = getAvailableIntervalsFromBusyIntervals(mergedBusyIntervals, daysRangeStart, daysRangeEnd);
    const timeSlots = createTimeSlotsFromAvailableIntervals(availableIntervals);
    const validStartTimes = findValidStartTimes(timeSlots, appointmentDuration);

    const timeSlotsWithScore = validStartTimes.map((timeSlot) => {
        return ({
            timeSlot,
            score: getTimeSlotScore(timeSlot, appointmentDuration, appointments)
        });
    });

    return timeSlotsWithScore.sort((a, b) => b.score - a.score).splice(0, 3);
}

function getBusyIntervals(appointments, availableDays, providerStartHour, providerEndHour, minBufferMinutes, daysRangeStart, daysRangeEnd, maxAppointmentsPerDay, leadTimeMin, providerTimezone) {
    const busy = [];

    appointments.forEach(appointment => {
        const appointmentStartTime = DateFns.addMinutes(appointment.date, appointment.appointmentDuration - minBufferMinutes)
        const appointmentEndTime = DateFns.addMinutes(appointment.date, appointment.appointmentDuration + minBufferMinutes)

        busy.push({
            start: appointmentStartTime,
            end: appointmentEndTime
        });
    });

    for (let currDay = daysRangeStart; currDay < daysRangeEnd; currDay = DateFns.addDays(currDay, 1)) {
        const dayInWeekIndex = DateFns.getDay(currDay);

        // availableDays looks like [null, "mon", "tue", "wed", "thu", "fri", null] where null days are unavailable
        // Skip today if today is unavailable
        if (!availableDays[dayInWeekIndex]) {
            busy.push({
                start: DateFns.startOfDay(currDay),
                end: DateFns.endOfDay(currDay)
            });

            continue;
        }

        // Skip today if we have more appointments than allowed
        const appointmentsToday = appointments.filter(appointment => DateFns.isSameDay(appointment.date, currDay));
        if (appointmentsToday.length >= maxAppointmentsPerDay) {
            busy.push({
                start: DateFns.startOfDay(currDay),
                end: DateFns.endOfDay(currDay)
            });

            continue;
        }

        const providerTimeZone = dateFnsTz.toZonedTime(currDay, providerTimezone);

        const localProviderStartHour = DateFns.setHours(providerTimeZone, providerStartHour);
        const localProviderEndHour = DateFns.setHours(providerTimeZone, providerEndHour);

        const dayStartHourInUTC = fromZonedTime(localProviderStartHour, providerTimezone);
        const dayEndHourInUTC = fromZonedTime(localProviderEndHour, providerTimezone);

        busy.push({
            start: DateFns.startOfDay(currDay),
            end: dayStartHourInUTC
        });

        busy.push({
            start: dayEndHourInUTC,
            end: DateFns.endOfDay(currDay)
        });
    }

    return busy;
}

function mergeBusyIntervals(busyIntervals) {
    if (busyIntervals.length === 0) {
        return [];
    }

    busyIntervals.sort((a, b) => a.start.getTime() - b.start.getTime());

    const mergedIntervals = [busyIntervals[0]];
    for (let index = 1; index < busyIntervals.length; index++) {
        const previousInterval = mergedIntervals[mergedIntervals.length - 1];
        const currentInterval = busyIntervals[index];

        if (previousInterval.end >= currentInterval.start) {
            previousInterval.end = new Date(Math.max(previousInterval.end.getTime(), currentInterval.start.getTime()));

            continue;
        }

        mergedIntervals.push(currentInterval);
    }

    return mergedIntervals;
}

function getAvailableIntervalsFromBusyIntervals(mergedBusyIntervals, daysRangeStart, daysRangeEnd) {
    if (mergedBusyIntervals.length === 0) {
        return [{
            start: daysRangeStart,
            end: daysRangeEnd
        }];
    }

    const availableIntervals = [];

    for (let index = 1; index < mergedBusyIntervals.length; index++) {
        const availableIntervalStartTime = mergedBusyIntervals[index - 1].end;
        const availableIntervalEndTime = mergedBusyIntervals[index].start;

        availableIntervals.push({
            start: availableIntervalStartTime,
            end: availableIntervalEndTime
        });
    }

    return availableIntervals;
}

function createTimeSlotsFromAvailableIntervals(availableIntervals) {
    const timeSlots = [];

    availableIntervals.forEach((timeSlot) => {
        let timeSlotStart = timeSlot.start;
        const timeSlotEnd = timeSlot.end;

        while (DateFns.addMinutes(timeSlotStart, SLOT_DURATION) <= timeSlotEnd) {
            timeSlots.push(timeSlotStart);
            timeSlotStart = DateFns.addMinutes(timeSlotStart, SLOT_DURATION);
        }
    });

    return timeSlots;
}

function findValidStartTimes(timeSlots, appointmentDuration) {
    const validStartTimes = [];
    const numberOfContinousSlotsRequired = appointmentDuration / SLOT_DURATION;

    for (let currentTimeSlot = 0; currentTimeSlot <= timeSlots.length - numberOfContinousSlotsRequired; currentTimeSlot++) {

        let isContinous = true;
        for (let timeSlotAhead = 1; timeSlotAhead < numberOfContinousSlotsRequired; timeSlotAhead++) {
            const timeOfTimeSlotAhead = DateFns.addMinutes(timeSlots[currentTimeSlot], SLOT_DURATION * timeSlotAhead);

            if (timeSlots[currentTimeSlot + timeSlotAhead].getTime() !== timeOfTimeSlotAhead.getTime()) {
                isContinous = false;

                break;
            }
        }

        if (isContinous) {
            validStartTimes.push(timeSlots[currentTimeSlot]);
        }
    }

    return validStartTimes;
}

function getTimeSlotScore(timeSlot, appointmentDuration, appointments) {
    const APPOINTMENT_DISTANCE_THRESHHOLD = 30;

    const start = timeSlot;
    const end = DateFns.addMinutes(timeSlot, appointmentDuration);

    const previousAppointment = appointments.filter(appointment => appointment.date <= start).pop();
    const nextAppointment = appointments.find(appointment => appointment.date >= end);

    let isAfterPrevious = false;
    let isBeforePrevious = false;

    if (previousAppointment && DateFns.differenceInMinutes(start, DateFns.addMinutes(previousAppointment.date, previousAppointment.appointmentDuration)) <= APPOINTMENT_DISTANCE_THRESHHOLD) {
        isAfterPrevious = true;
    }

    if (nextAppointment && DateFns.differenceInMinutes(nextAppointment.date, end) <= APPOINTMENT_DISTANCE_THRESHHOLD) {
        isBeforePrevious = true;
    }

    if (isAfterPrevious && isBeforePrevious) {
        return 2;
    }

    if (isAfterPrevious || isBeforePrevious) {
        return 1;
    }

    return 0;
}

module.exports = generateSuggestions;
