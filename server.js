require("dotenv").config();
const crypto = require("crypto");
const dns = require("dns");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl/new", (req, res) => {
  // Check if passed URL is valid URL
  const originalUrl = req.body.url;
  const urlRegex = /^https?:\/\//i;
  const hostname = originalUrl.replace(urlRegex, "");

  dns.lookup(hostname, (err, address, family) => {
    if (err === null) {
      const shortUrl = crypto.randomBytes(4).toString("hex");
      res.json({ original_url: originalUrl, short_url: shortUrl });
    } else {
      console.log(err);
    }
  });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  // Check for existing short URL
  // Redirect to original URL
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
