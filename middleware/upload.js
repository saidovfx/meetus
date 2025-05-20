const express = require('express');
const router = express.Router();
const upload = require('./path/to/multerConfig'); // sizning multer config faylingiz
const messageController = require('./path/to/messageController');

// Faylni 'media' nomli field sifatida olish
router.post('/api/messages/send', upload.single('media'), messageController.sendMessage);

module.exports = router;

