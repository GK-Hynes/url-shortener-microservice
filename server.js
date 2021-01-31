require("dotenv").config();

const crypto = require("crypto");
const dns = require("dns");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./db");
const Url = require("./models/Url");

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", async (req, res) => {
  // TODO - Check if passed URL is valid URL

  const originalUrl = req.body.url;
  const baseUrl = process.env.BASE_URL;
  const shortCode = crypto.randomBytes(4).toString("hex");

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json({ original_url: url.originalUrl, short_url: url.shortUrl });
    } else {
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

app.get("/api/shorturl/:short_url", (req, res) => {
  // Check for existing short URL
  // Redirect to original URL
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
