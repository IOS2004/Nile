const express = require("express")
const path = require("path")
const router = express.Router()
const Product=require("../models/product.js")






router.get('/', async (req, res) => {

    res.sendFile(path.join(__dirname, '../..', 'public/pages', 'product_page.html'));
})
  .get('/details', async (req, res) => {
  
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
   
    const product = await Product.findOne({id: Number(id)}).exec();
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product) 
  } catch(err)
    {
      console.error(err);
      res.status(500).json({ message: 'Error fetching products' });
    }
  })

module.exports = router