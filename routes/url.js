require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const { isWebUri } = require("valid-url");
const Url = require("../models/Url");

const router = express.Router();

router.post("/api/shorturl/new", async (req, res) => {
  const originalUrl = req.body.url;
  const baseUrl = process.env.BASE_URL;

  // Check if passed URL is valid URL
  if (!isWebUri(originalUrl)) {
    return res.status(400).json({ error: "invalid url" });
  }

  const shortCode = crypto.randomBytes(4).toString("hex");

  try {
    // Check if URL is already in db
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json({ original_url: url.originalUrl, short_url: url.shortUrl });
    } else {
      // Otherwise create shortCode and shortUrl
      const shortUrl = baseUrl + "/" + shortCode;

      url = new Url({
        originalUrl,
        shortUrl,
        shortCode
      });
      await url.save();

      res.json({ original_url: originalUrl, short_url: shortUrl });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

router.get("/api/shorturl/:short_url", async (req, res) => {
  // Check for existing short URL
  // Redirect to original URL
  const shortCode = req.params.short_url;

  try {
    let url = await Url.findOne({ shortCode });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

module.exports = router;
