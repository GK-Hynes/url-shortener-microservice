const crypto = require("crypto");
const { isWebUri } = require("valid-url");
const Url = require("../models/Url");

exports.createShortUrl = async (req, res) => {
  const originalUrl = req.body.url;

  // Check if passed URL is valid URL
  if (!isWebUri(originalUrl)) {
    return res.json({ error: "invalid url" });
  }

  // Generate shortCode for short URL
  const shortCode = crypto.randomBytes(4).toString("hex");

  try {
    // Check if URL is already in db
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json({ original_url: url.originalUrl, short_url: url.shortCode });
    } else {
      url = new Url({
        originalUrl,
        shortCode
      });
      await url.save();
      res.json({ original_url: originalUrl, short_url: shortCode });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

exports.getShortUrl = async (req, res) => {
  // Check for existing short URL
  // Redirect to original URL
  const shortCode = req.params.short_url;

  try {
    let url = await Url.findOne({ shortCode });
    if (url) {
      return res.status(301).redirect(url.originalUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};
