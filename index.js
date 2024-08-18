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
const cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/nile")
  .then(() => { console.log("Mongoose connected") })
  .catch((err) => { console.log("Error", err) })

app.use('/nile/signup', signup)
app.use('/nile', web)
app.use('/nile/login', login)
app.use('/nile/shop',shop)
app.use('/nile/product',productShowcase)

app.listen(8000, () => { console.log("Server running on port 8000") })