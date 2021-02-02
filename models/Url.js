const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: String
});

module.exports = mongoose.model("Url", urlSchema);
