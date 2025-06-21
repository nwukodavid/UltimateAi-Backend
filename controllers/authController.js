const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: "Signup successful",
      user: { email: newUser.email, id: newUser._id },
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, id: user._id },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Forgot Password (dummy for now)
exports.forgotPassword = async (req, res) => {
  return res.status(200).json({ message: "Forgot password route working" });
};
