const express = require("express")
const path = require("path")
const router = express.Router()
const User = require("../models/user")
const { authenticateToken } = require("../middleware/auth")

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/index.html'));
})

router.get('/auth-status', authenticateToken, (req, res) => {
  // console.log(req.isAuthenticated)
  // const authStatus = req.isAuthenticated ? 'Logged In' : 'Logged Out';
  // res.json({ authStatus });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the cookie named 'token'
  res.sendStatus(200); // Send a success status
});


module.exports = router