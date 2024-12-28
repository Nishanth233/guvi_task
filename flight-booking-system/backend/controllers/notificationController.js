const { scheduleNotification } = require('../services/notificationService');

exports.scheduleBookingNotifications = (req, res) => {
  const { email, phoneNumber, message, notificationTime } = req.body;

  scheduleNotification(notificationTime, email, phoneNumber, message);

  res.status(200).json({ message: 'Notification scheduled' });
};
