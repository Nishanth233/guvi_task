const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, message) => {
  client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to
  })
  .then(message => console.log('SMS sent:', message.sid))
  .catch(error => console.error('Error sending SMS:', error));
};

module.exports = { sendSMS };
