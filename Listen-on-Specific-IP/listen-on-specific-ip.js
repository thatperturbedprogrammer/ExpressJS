const express = require("express");

const app = express();
const HOST = "localhost"; // Only accessible locally
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server running on localhost!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
