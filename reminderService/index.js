const cron = require('node-cron');
const enqueueMedicationReminders = require('./medicationReminderHelpers/medicationReminderEnqueue');
const enqueueProviderSummaries = require('./providerSummaryHelpers/providerSummaryEnqueue');
const startSummaryWorker = require('./providerSummaryHelpers/providerSummaryWorker');
const startReminderWorker = require('./medicationReminderHelpers/medicationReminderWorker');
startReminderWorker();
startSummaryWorker();

cron.schedule('0 */15 * * * *', async () => {
    try {
        await enqueueMedicationReminders();
    } catch (error) {
        console.log(error);
    }
});


cron.schedule('0 7 * * *', async () => {
    try {
        await enqueueProviderSummaries();
    } catch (error) {
        console.log(error);
    }
});
