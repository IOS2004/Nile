const jwt = require("jsonwebtoken");
const SECRET_KEY = "Va&&&&&$$$$$"; // Use the same secret key used in login route

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username, email: user.email}, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to authenticate a JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token; // Assuming the token is stored in cookies

//   if (!token) {
//     return res.json({ authenticated: false });   // No token found
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.json({ authenticated: false });  // Token is not valid
//     }

//     return res.json({ authenticated: true });
//   });

// };
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies

  if (!token) {
    return res.json(null); // No token found
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.json(null); // Token is not valid
    }

    return res.json(user); // Send the entire user data
  });
};

module.exports = {
  generateToken,
  authenticateToken
};
