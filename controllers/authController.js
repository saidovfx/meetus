const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Username allaqachon bormi?
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username band' });

    // Parolni hash qilish
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Foydalanuvchini yaratish
    const newUser = new User({
      email: email || null,
      username,
      passwordHash
    });

    await newUser.save();

    // JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Ro‘yxatdan o‘tildi',
      token,
      user: {
        id: newUser._id,
        username: newUser.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Username topilmadi' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Noto‘g‘ri parol' });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Kirish muvaffaqiyatli',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id username');
    res.json(users);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server xatolik' });
  }
};



module.exports = { register, login, getUsers };

