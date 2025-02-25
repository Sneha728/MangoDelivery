const jwt = require("jsonwebtoken");
const User = require("../model/usersModel");

const cookieParser = require("cookie-parser");

const protectRoute = async (req, res, next) => {
  const secret = process.env.JWT_SECRET || "Fine123@";

  try {
    // Get token from cookies (note: using "cookies" plural)
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorised - No token provided" });
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid token" });
    }

    // Find the user from the decoded token (excluding the password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user to the request object for use in subsequent middleware/routes
   
    req.user = user;
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Error in protect route:", error.message);
    return res.status(400).json({ message: "Server Error" });
  }
};

module.exports = protectRoute;
