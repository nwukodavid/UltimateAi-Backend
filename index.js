// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Custom Routes
// Custom Routes
app.use("/api/auth", require("./routes/auth")); // Auth routes
app.use("/api/assist", require("./routes/assist")); // Assistant routes
app.use("/api/news", require("./routes/newsapi")); // News API
app.use("/api/wiki", require("./routes/wiki")); // Wikipedia
app.use("/api/pdf", require("./routes/pdfGenerator")); // PDF Generator
// Root test endpoint
app.get("/", (req, res) => {
  res.send("✅ Welcome to UltimateAI Backend");
});

// MongoDB Connection and Server Launch
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
