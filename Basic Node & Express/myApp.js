let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

let absolutePath = __dirname + "/views/index.html";
let staticAssetsPath = __dirname + "/public";

// Mounting Middleware
app.use("/public", express.static(staticAssetsPath));

// Logger Middleware
app.use("/", function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Send HTML File
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

// Using variables from .env file
app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message: message,
  });
});

// Chaining Middlewares
app.use(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);

// Echo Server
app.use("/:word/echo", function (req, res) {
  let word = req.params.word;
  res.json({ echo: word });
});

// Get query parameter input from the Client
app.get("/name", function (req, res) {
  let firstname = req.query.first;
  let lastname = req.query.last;
  res.json({ name: firstname + " " + lastname });
});

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

// Get Data from POST Requests
app.post("/name", function (req, res) {
  let firstname = req.body.first;
  let lastname = req.body.last;
  // console.log(req.body);

  res.json({
    name: firstname + " " + lastname,
  });
});
module.exports = app;
