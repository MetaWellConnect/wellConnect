const { providerSummaryQueue } = require('../queue');
const { fetchWithErrorHandling } = require('../utils');
require('dotenv').config();

const MEDISCAN_DB_API_URL = process.env.MEDISCAN_DB_API_URL;

async function enqueueProviderSummaries() {
    const response = await fetchWithErrorHandling(`${MEDISCAN_DB_API_URL}/reminders/sent`);
    const summaries = await response.json();
    console.log(summaries)
    summaries.forEach(async (summary) => {
        await providerSummaryQueue.add(
            'SUMMARY',
            { summary },
        );

        console.log(`Summary Reminder Queued!`);
    });

}

module.exports = enqueueProviderSummaries;
