const express = require("express")
const bodyParser = require("body-parser");
const signup = require("./routes/signup")
const web = require("./routes/main.js")
const app = express()
const login = require("./routes/login.js")
const cookieparser = require("cookie-parser")


app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/pd")
  .then(() => { console.log("Mongoose connected") })
  .catch((err) => { console.log("Error", err) })

app.use('/signup', signup)
app.use('/web', web)
app.use('/login', login)


app.listen(8000, () => { console.log("Server running on port 8000") })