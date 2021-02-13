require("dotenv").config();
const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.post("/api/shorturl/new", urlController.createShortUrl);

router.get("/api/shorturl/:short_url", urlController.getShortUrl);

module.exports = router;
