const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/schedule', notificationController.scheduleBookingNotifications);

module.exports = router;
