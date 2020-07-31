// From Express documentation: https://expressjs.com/en/starter/hello-world.html
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

// Mongoose / MongoDB code from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// Set up default mongoose connection
var config = require("./config");
var mongoDB = config.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

module.exports = app;

// app.use(express.static("public")); // exposes all static files within 'public' folder so that they may be used
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
