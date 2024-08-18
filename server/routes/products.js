const express = require("express")
const path = require("path")
const router = express.Router()
const Product=require("../models/product.js")



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'public/pages', 'shop.html'));
})
  .get('/products', async (req, res) => {
    try{
      const products = await Product.find({}).exec();
      res.json(products);
    }
    catch(err)
    {
      console.error(err);
      res.status(500).json({ message: 'Error fetching products' });
    }
   });

module.exports = router