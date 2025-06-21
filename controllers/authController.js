// controllers/authController.js

// Dummy in-memory database (you should use MongoDB in production)
const users = [];

// Register a new user
exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  users.push({ email, password });
  return res.status(201).json({ message: "User registered successfully." });
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res.status(200).json({ message: "Login successful." });
};

// Forgot password
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Simulate sending password reset link (mock)
  return res.status(200).json({
    message: `A password reset link has been sent to ${email}. (This is a mock response)`
  });
};
