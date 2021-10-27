require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3300; // setting up port
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
// database connection

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://parul:qqaazz123@cluster0.dnt82.mongodb.net/sbite?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// session config

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl:
        "mongodb+srv://parul:qqaazz123@cluster0.dnt82.mongodb.net/sbite?retryWrites=true&w=majority",
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// assests kha rakhe hai btana hai to add css in home.ejs
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine

app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

require("./routes/web")(app);
