// From Express documentation: https://expressjs.com/en/starter/hello-world.html
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const config = require("./config/config");
const errorHandler = require("errorhandler");
const cors = require("cors");
const mongoStore = require("connect-mongo")(session);
const compression = require("compression");
const helmet = require("helmet");

const isProduction = process.env.CURR_ENV === "production";

const app = express();

app.locals.MAPS_KEY = config.MAPS_KEY;

// Mongoose / MongoDB code from https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// Set up default mongoose connection
mongoose.promise = global.Promise;
var mongoDB = config.DB_URL;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // exposes all static files within 'public' folder so that they may be used
app.use(favicon(path.join(__dirname, "public/image/", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: config.PASSPORT_SECRET,
    cookie: { maxAge: 360000000, secure: false },
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: db }),
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(cors());
app.use(compression());
app.use(helmet());

if (!isProduction) {
  app.use(errorHandler());
}

// Models
require("./models/user");
require("./models/restaurant");
require("./models/menu");
require("./models/menuitem");

const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

// Error handlers & middlewares from: https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/
// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   if (!isProduction) {
//     res.json({
//       errors: {
//         message: err.message,
//         error: err, // if not production env, error = err
//       },
//     });
//   } else {
//     res.json({
//       errors: {
//         message: err.message,
//         error: {}, // if production env, error = {}
//       },
//     });
//   }
// });

module.exports = app;
