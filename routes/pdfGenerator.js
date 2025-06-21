const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "PDF Generator route working" });
});

module.exports = router;
