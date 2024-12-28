const schedule = require('node-schedule');
const { sendEmail } = require('./emailService');
const { sendSMS } = require('./smsService');

const scheduleNotification = (date, email, phoneNumber, message) => {
  schedule.scheduleJob(date, () => {
    if (email) {
      sendEmail(email, 'Booking Update', message);
    }
    if (phoneNumber) {
      sendSMS(phoneNumber, message);
    }
  });
};

module.exports = { scheduleNotification };
