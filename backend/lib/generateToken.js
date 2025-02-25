const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const generateToken = (userId, res) => {
  const secret = process.env.JWT_SECRET || "Fine123@";
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,  // Ensures the cookie cannot be accessed via JavaScript
      // Use HTTPS in production
   // Helps prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds
  });

  return token;
};

module.exports = generateToken;
