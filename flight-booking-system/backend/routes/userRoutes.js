const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define route for user registration
router.post('/register', userController.registerUser);

// Define route for user login
router.post('/login', userController.loginUser);

module.exports = router;
