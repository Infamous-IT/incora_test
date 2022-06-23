const express = require('express');
const authController = require('../controllers/auth');
const verifyAuthToken = require('../middleware/middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;