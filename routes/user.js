const express = require('express');
const userController = require('../controllers/user.js');

const router = express.Router();

router.put('/:id', userController.update);
router.get('/:id', userController.getById);
router.get('/', userController.getUsers);

module.exports = router;