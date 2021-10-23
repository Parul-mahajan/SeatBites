const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3300; // setting up port

// assests kha rakhe hai btana hai to add css in home.ejs
app.use(express.static("public"));

// set template engine

app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("home"); // folder/file
});
app.get("/cart", (req, res) => {
  res.render("customers/cart"); // folder/file
});

app.get("/login", (req, res) => {
  res.render("auth/login"); // folder/file
});

app.get("/register", (req, res) => {
  res.render("auth/register"); // folder/file
});
