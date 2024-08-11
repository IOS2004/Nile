const express = require("express")
const path = require("path")
const router = express.Router()
const User = require("../models/user")
const { generateToken } = require("../middleware/auth.js")


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'views', 'signup.html'));
})
  .post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      const email = req.body.email.toLowerCase();
      const existingUser = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Email already exists. Please login');
      }
      if (existingUsername) {
        return res.status(400).send('Username already exists. Please login');
      }

      const user = new User({ username, password, email });
      await user.save();

      const token = generateToken(user)
      res.cookie('token', token)

      res.redirect('/nile');
    } catch (error) {
      res.status(500).send('Error registering user: ' + error.message);
    }
  });

module.exports = router