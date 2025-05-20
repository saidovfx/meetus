const Message = require('../models/Message');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: 'Sender va Receiver ID kerak' });
    }

    if (!text && !req.file) {
      return res.status(400).json({ message: 'Xabar matni yoki fayl yuborilishi kerak' });
    }

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, // rasm yoki video farqi yo'q
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const uploadResult = await uploadFromBuffer(req.file.buffer);
      mediaUrl = uploadResult.secure_url;
      mediaType = uploadResult.resource_type;
    }

    const messageData = {
      sender: senderId,
      receiver: receiverId,
      text: text || '',
      mediaUrl,
      mediaType,
    };

    const message = new Message(messageData);
    await message.save();

    res.status(201).json({ message: 'Xabar yuborildi', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi', error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
  }
};
