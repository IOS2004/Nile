const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/', async (req, res) => {
  try {

    console.log('Request body:', (req.body));


    const { cart, username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }


    const user = await User.findOneAndUpdate(
      { username: username },
      { cart: cart },
      { new: true }
    ).exec();

    if (user) {
      res.json({ success: true, cart: user.cart });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
