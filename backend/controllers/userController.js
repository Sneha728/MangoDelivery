
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/generateToken");
const User = require("../model/usersModel");
  


const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.cookies);

  try {
    if (!fullName || !email || !password) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating new user...");
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log("New user created:", newUser);

    console.log("Generating token...");
    const token = await generateToken(newUser._id,res); // Generate the token and return it, not using `res` here
    console.log("Token generated:", token);

    return res.status(201).json({
      message: "New user created successfully",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      token: token, // Send the token directly
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for missing fields
    console.log("Email received for login:", email);
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user
    const findUser = await User.findOne({ email: email.toLowerCase() });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    console.log("User found:", findUser);

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    generateToken(findUser._id, res);
    console.log("Token generated and set in cookie for user:", findUser._id);

    return res.status(201).json({
      _id: findUser._id,
      fullName: findUser.fullName,
      email: findUser.email,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
      path: "/", // Ensure the path matches how the cookie was originally set
      maxAge: 0 // Expire immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in check auth", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { signup, login, logout, checkAuth };
