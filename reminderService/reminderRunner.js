const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('running a testk!');
})
