// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/cart', async (req, res) => {
  try {



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
}).post('/fav', async (req, res) => {
  try {


    const { favourites, username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }


    const user = await User.findOneAndUpdate(
      { username: username },
      { favourites: favourites },
      { new: true }
    ).exec();

    if (user) {
      res.json({ success: true, favourites: user.favourites });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

