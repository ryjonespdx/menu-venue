// From Express documentation: https://expressjs.com/en/starter/hello-world.html
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const config = require("./config/config");
const errorHandler = require("errorhandler");

const isProduction = process.env.CURR_ENV === "production";

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");

const app = express();

//- favicon from https://favicon.io/emoji-favicons/steaming-bowl/
app.use(favicon(path.join(__dirname, "public/image/", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // exposes all static files within 'public' folder so that they may be used
app.use(
  session({
    secret: config.PASSPORT_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

// Mongoose / MongoDB code from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// Set up default mongoose connection
mongoose.promise = global.Promise;
var mongoDB = config.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Models
require("./models/user");
require("./models/restaurant");
require("./models/menu");
require("./models/menuitem");
require("./config/passport"); // (!) This line must be below all 'require models/*'

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

// Error handlers & middlewares from: https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/
app.use((err, req, res) => {
  res.status(err.status || 500);

  if (!isProduction) {
    res.json({
      errors: {
        message: err.message,
        error: err, // if not production env, error = err
      },
    });
  } else {
    res.json({
      errors: {
        message: err.message,
        error: {}, // if production env, error = {}
      },
    });
  }
});

// app.use(bodyParser.urlencoded({ extended: true })); // lets use make use of the 'req.body' object

// app.get("/", function (req, res) {
//   res.render("index", { results: null });
// });
// app.post("/", function (req, res) {
//   // TODO: utilize Google Maps API here
//   console.log(req.body.address); // the address submitted by the user
//   res.render("index", {
//     results: `${req.body.address} data from google and/or mysql`,
//   });
// });

// app.get("/login", function (req, res) {
//   res.render("login");
// });

// app.post("/login", function (req, res) {
//   // login button on login page
//   console.log(req.body.username);
//   console.log(req.body.password);
//   if (true)
//     // TODO: validate user; serve restaurant owner page or reject
//     res.render("owner", { welcomeOwner: `${req.body.username}'s page` });
//   else res.render("login");
// });

// app.post("/register", function (req, res) {
//   // register button on login page
//   console.log(req.body.username);
//   console.log(req.body.password);
//   if (true)
//     // TODO: validate registration; serve restaurant owner page or reject
//     res.render("owner", { welcomeOwner: `${req.body.username}'s page` });
//   else res.render("login");
// });

// app.listen(3000, function () {
//   console.log("Web app listening on port 3000 at http://127.0.0.1:3000/");
// });

module.exports = app;
