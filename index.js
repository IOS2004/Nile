const express = require("express")
const bodyParser = require("body-parser");
const signup = require("./server/routes/signup")
const web = require("./server/routes/main")
const app = express()
const path = require("path")
const login = require("./server/routes/login.js")
const cookieparser = require("cookie-parser")
const shop = require("./server/routes/products.js")
const productShowcase = require("./server/routes/productShowcase.js")
const userUpdate = require("./server/routes/updateUser.js")
const getCart=require("./server/routes/cart.js")
const getFav=require("./server/routes/favouritProducts.js")
require('dotenv').config();
const MONGODB_KEY = process.env.MONGODB_URI;

app.use(express.json())
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose")

if (!MONGODB_KEY) {
  console.error('Error: MONGODB_KEY is not defined in the environment variables.');
  process.exit(1); // Exit the application if the key is not found
}

mongoose.connect(MONGODB_KEY)
  .then(() => { console.log("Mongoose connected") })
  .catch((err) => { console.log("Error", err) })

app.use('/nile/signup', signup)
app.use('/nile', web)
app.use('/nile/login', login)
app.use('/nile/shop', shop)
app.use('/nile/product', productShowcase)
// app.use('/nile/update-cart', userUpdate)
app.use('/nile/cart/products',getCart)
app.use('/nile/update', userUpdate)
app.use('/nile/fav/products',getFav)
app.listen(8000, () => { console.log("Server running on port 8000") })
