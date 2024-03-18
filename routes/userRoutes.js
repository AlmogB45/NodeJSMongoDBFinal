// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const authenticateJWT = require('../middlewares/authMiddleware');


// Route for user signup
router.post('/signup', async (req, res) => {
  console.log('Signup request received');
  console.log(req.body);
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    if (err.code === 11000) {
        res.status(400).json({ error: 'Username already exists' });
      } else {
        res.status(400).json({ error: err.message });
      }
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if password is correct
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Protected route example
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    // Access authenticated user from req.user
    const user = await User.findById(req.user.userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

