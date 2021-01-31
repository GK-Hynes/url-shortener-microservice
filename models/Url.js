const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: String,
  shortUrl: String
});

module.exports = mongoose.model("Url", urlSchema);
