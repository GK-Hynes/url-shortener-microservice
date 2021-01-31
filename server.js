require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const urlRouter = require("./routes/url");
const connectDB = require("./db");

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

// Connect router
app.use(urlRouter);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
