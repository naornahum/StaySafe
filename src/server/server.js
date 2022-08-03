const express = require("express");
const app = express();
const port = 4001;
app.use(express.static(__dirname), (req, res, next) => {
  next();
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});
app.listen(port, () => {
  console.log("Port number ", port, " is open");
});
