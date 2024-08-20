const User = require("../models/user")
const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.JWT_KEY;

if (!SECRET_KEY)
{
  console.error('Error: JWT_KEY is not defined in the environment variables.');
  process.exit(1); // Exit the application if the key is not found
}

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};


const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(null);
  }

  jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      return res.json(null);
    }

    try {
      const user = await User.findOne({ username: decodedToken.username }).exec();
      const userData = user.toObject();
      delete userData.password;
      delete userData.createdAt;
      delete userData.updatedAt;
      delete userData._id;
      delete userData.__v;

      res.json(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json(null);
    }
  });
};

module.exports = {
  generateToken,
  authenticateToken
};
