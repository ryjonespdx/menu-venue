/********************************************************************************************
 * indexController: functions to handle GET and POST requests called from index
 * *****************************************************************************************/

var Restaurant = require("../models/restaurant");
var User = require("../models/user");
const passport = require("passport");

const { users, restaurants, menus, menuItems } = require("../mockData");

exports.index_get = function (req, res) {
  res.render("index", { title: "Menu Venue" });
};

exports.index_post = function (req, res) {
  // search the database for...
  let searched = req.body.name;

  Restaurant.find(
    { $or: [{ name: searched }, { cuisine: searched }] },
    function (err, found) {
      if (err) res.render("error", { message: "we have issues, try later" });
      else if (found.length === 0)
        res.render("index", {
          restaurant_info: { name: searched },
          title: "no restaurant found",
        });
      else {
        res.render("restaurant_list", {
          title: `Results for ${searched}`,
          restaurant_list: found,
        });
      }
    }
  );
};

exports.login_get = function (req, res) {
  res.render("login", {
    title:
      "Login (DEBUG: " + req.session.username + ", " + req.session.id + ")",
  });
};

// New auth operations from https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522
exports.login_post = function (req, res, next) {
  if (!req.body.username) {
    return res.status(422).json({
      errors: {
        username: "is required",
      },
    });
  }

  // if (!req.body.email) {
  //   return res.status(422).json({
  //     errors: {
  //       email: "is required",
  //     },
  //   });
  // }

  if (!req.body.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        // return res.json({ user: user.toAuthJSON(user.token) });
        req.session.username = req.body.username;
        res.redirect(`/user`);
      } else {
        return res.render("login", { title: "Invalid Credentials" });
      }
    }
  )(req, res, next);
};

exports.logout_get = function (req, res, next) {
  req.session.destroy();
  res.redirect("/login");
};

exports.register_get = function (req, res) {
  res.render("create_user", { title: "enter email and create a password" });
};

exports.register_post = function (req, res, next) {
  const { username, email, password } = req.body;
  User.findOne({ "local.username": username }, (err, userMatch) => {
    if (userMatch) {
      return res.render(`create_user`, {
        title: "Sorry, that username is taken.",
      });
    }
    const newUser = new User({
      "local.username": username,
      "local.email": email,
    });

    newUser.setPassword(password[0]);

    newUser.save((err, savedUser) => {
      if (err)
        return res.render(`create_user`, {
          title: "Sorry, that username is taken.",
        });
      // return res.json(savedUser);
      res.redirect(`/user`);
    });
  });
};

exports.change_password = function (req, res, next) {
  User.findOne({ resetPasswordToken: req.body.token }).then(function (user) {
    // TODO add logic for checking the expiry time of the generated token.

    user.setPassword(req.body.password);

    user.updateOne(
      {
        "local.salt": user.local.salt,
        "local.hash": user.local.hash,
      },
      function (err, savedUser) {
        if (err) return res.json(err);
        return res.json(savedUser);
      }
    );
  });
};

exports.forgot_password = function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ "local.email": req.body.email }, function (err, user) {
          if (!user) {
            return res.send({
              error: "No account with that email address exists.",
            });
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // logic for expiring password

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        // Create a SMTP transporter object
        let smtpTransport = nodemailer.createTransport({
          host: process.env.CLIENT_HOST,
          service: "SendGrid",
          port: process.env.SENDGRID_PORT,
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
          },
          logger: true,
          debug: true, // include SMTP traffic in the logs
        });

        // TODO set this up properly
        var mailOptions = {
          to: user["local"]["email"],
          from: "example@example.com",
          subject: "Password change request",
          text:
            "Hi" +
            user.username +
            "\n" +
            "Please click on the following link" +
            "http://" +
            process.env.CLIENT_HOST +
            "/change_password?token=" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          res.send({ status: "Email sent" });
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.send({ err: err });
    }
  );
};
/*
 *
 * End of new auth operations
 *
 */
