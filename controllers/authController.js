exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // TODO: Add your logic to save user to DB here

  return res.status(201).json({ message: "Signup successful" });
};
