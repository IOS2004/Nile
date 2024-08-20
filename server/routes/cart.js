const express = require("express")
const path = require("path")
const router = express.Router()
const Product=require("../models/product.js")






router.post('/', async (req, res) => {
  try {
    // Get the cart data from the request body
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: 'Invalid cart data' });
    }

    // Extract product IDs from the cart
    const productIds = cart.map(item => item.id);

    // Query the database for products with the given IDs
    const products = await Product.find({ id: { $in: productIds } });
    res.json(products)
  }
  catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router