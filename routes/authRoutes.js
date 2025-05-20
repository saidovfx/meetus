const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // keyin yozamiz

// Ro‘yxatdan o‘tish
router.post('/register', register);

// Login
router.post('/login', login);

router.get('/users', authMiddleware, getUsers);

module.exports = router;
