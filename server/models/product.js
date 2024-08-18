const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  id:
  {
    type: Number,
    unique: true,
  },
  path: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String
  }
})
const Products = mongoose.model("products", productSchema)
module.exports = Products;
