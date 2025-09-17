const express = require('express');
const router = express.Router();
const multer = require('multer');
const { sendMessage, getMessages } = require('../controllers/messageController');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/send', upload.single('media'), sendMessage);

router.get('/:userId1/:userId2', getMessages);

module.exports = router;
