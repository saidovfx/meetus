const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendMessage, getMessages } = require('../controllers/messageController');

// Multer sozlamalari
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Xabar yuborish - media nomli fayl uchun multer middleware qo‘shildi
router.post('/send', upload.single('media'), sendMessage);

// Ikkala user orasidagi xabarlarni olish
router.get('/:userId1/:userId2', getMessages);

module.exports = router;
