const express = require("express")
const path = require("path")
const router = express.Router()
const User = require("../models/user")
const { generateToken } = require("../middleware/auth.js")



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'views', 'login.html'));
})
  .post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        return res.redirect('/nile/login?error=user_not_found');
      }

      const match = await existingUser.comparePassword(password)
      if (!match) {
        return res.redirect('/nile/login?error=pass');
      }
      const token = generateToken(existingUser)
      res.cookie('token', token)

      res.redirect('/nile');

    } catch (error) {
      console.log(error)
      res.status(500).send('Error ' + error.message);
    }
  });

module.exports = router