const express = require("express")
const path = require("path")
const router = express.Router()
const User = require("../models/user")
const { authenticateToken } = require("../middleware/auth")

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../views/index.html'));
})

router.get('/auth-status', authenticateToken, (req, res) => {
  
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.sendStatus(200);
});

router.get('/', (req, res) => {
  res.render('index');
});




module.exports = router