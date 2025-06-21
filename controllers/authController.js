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
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input (you can add your own logic here)
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check against DB (mocked for now)
    const isUser = true; // replace with your DB logic
    if (!isUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", token: "abc123" });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

module.exports = { loginUser };
// Forgot Password (dummy for now)
exports.forgotPassword = async (req, res) => {
  return res.status(200).json({ message: "Forgot password route working" });
};
