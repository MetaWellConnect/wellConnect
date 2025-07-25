const { providerSummaryQueue } = require('../queue');
const { fetchWithErrorHandling } = require('../utils');
require('dotenv').config();

const MEDISCAN_DB_API_URL = process.env.MEDISCAN_DB_API_URL;

async function enqueueProviderSummaries() {
    const response = await fetchWithErrorHandling(`${MEDISCAN_DB_API_URL}/reminders/sent`);
    const summaries = await response.json();
    Object.entries(summaries).forEach(async ([key, value]) => {
        await providerSummaryQueue.add(
            'SUMMARY',
            { summary: value },
            { delay: 1000 }
        );

        console.log(`Summary Reminder Queued!`);
    });

}

module.exports = enqueueProviderSummaries;
