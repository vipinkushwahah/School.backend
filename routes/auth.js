// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// const JWT_SECRET = 'your-secret-key';

// // Register Route
// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ msg: 'User already exists' });

//     const newUser = new User({
//       username,
//       email,
//       passwordHash: password
//     });
//     await newUser.save();
//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User does not exist' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     // Create JWT Token
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;
