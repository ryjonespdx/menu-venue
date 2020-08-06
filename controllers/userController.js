/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/
const mongoose = require("mongoose");
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var Menu = require("../models/menu");
var MenuItem = require("../models/menuitem");
const passport = require("passport");

/*
 *
 * New auth operations from https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522
 *
 */
exports.login = function (req, res, next) {
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
        res.redirect(`/user/` + req.body.username);
      } else {
        return res.render("login", { title: "Invalid Credentials" });
      }
    }
  )(req, res, next);
};

exports.signup = function (req, res, next) {
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
      res.redirect(`/user/` + username);
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

const { users, restaurants, menus, menuItems } = require("../mockData");

// user controls

exports.user_get = function (req, res) {
  res.render("login", { title: "login" });
};

exports.user_post = function (req, res) {
  // search the database for...
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username, password: password }, function (
    err,
    found
  ) {
    if (err) res.render("login", { title: "we have issues, try later" });
    else if (!found) res.render("login", { title: "no user found" });
    else res.redirect("/user/" + found.username);
  });
};

// Display detail page for a specific user.
exports.user_detail = function (req, res) {
  let username = req.params.id;

  console.log(req.session.username);
  if (username != req.session.username) {
    username = req.session.username;
  }

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.find({ owner: foundUser._id }, function (err, foundRestaurant) {
      if (err) res.render("error", { message: err });
      else {
        res.render("user", {
          title: "Menu Venue: Your Restaurants",
          user_info: foundUser.local,
          restaurant_list: foundRestaurant,
          menu_list: [],
          menu: [],
        });
      }
    });
  });
};

exports.register_get = function (req, res) {
  res.render("create_user", { title: "enter email and create a password" });
};

exports.register_post = function (req, res) {
  // search the database for...
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // passwords don't match, try again
  if (password[0] !== password[1])
    res.render("create_user", { title: "Passwords do not match!" });

  User.findOne({ username: username }, function (err, found) {
    if (err) res.render("error", { message: err });
    else if (found !== null)
      res.render("create_user", { title: "User already exists!" });
    else {
      new User({
        username: username,
        email: email,
        password: password[0],
      }).save(function (err) {
        if (err) res.render("error", { message: err });
        else res.redirect("/user/" + username);
      });
    }
  });
};

// Display User create form on GET.
exports.user_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User create GET");
};

// Display User create form on POST.
exports.user_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User create POST");
};

// Display User update form on GET.
exports.user_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User update GET");
};

// Handle User update on POST.
exports.user_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User update POST");
};

// Display User delete form on GET.
exports.user_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User delete GET");
};

// Handle User delete on POST.
exports.user_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User delete POST");
};

// Display list of all Users.
exports.user_list = function (req, res) {
  res.send("NOT IMPLEMENTED: User list GET");
};

// user restaurant controls

// Display Restaurant create form on GET.
exports.user_restaurant_create_get = function (req, res) {
  let username = req.params.id;

  res.render("create_restaurant", { user_info: { username: username } });
};

// Display Restaurant create form on POST.
exports.user_restaurant_create_post = function (req, res) {
  let username = req.params.id;
  name = req.body.name;
  cuisine = req.body.cuisine;
  street = req.body.street;
  city = req.body.city;
  state = req.body.state;
  zip = req.body.zip;
  number = req.body.number;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: name }, function (
      err,
      foundRestaurant
    ) {
      if (err) res.render("error", { message: err });
      else if (foundRestaurant !== null)
        res.render("create_restaurant", {
          user_info: foundUser.local,
          message: "Restaurant already exists!",
        });
      else {
        new Restaurant({
          owner: foundUser._id,
          name: name,
          cuisine: cuisine,
          street: street,
          city: city,
          zip: zip,
          state: state,
          number: number,
        }).save(function (err) {
          if (err) res.render("error", { message: err });
          else {
            res.redirect("/user/" + foundUser.local.username);
          }
        });
      }
    });
  });
};

// Display Restaurant update form on GET.
exports.user_restaurant_update_get = function (req, res) {
  let username = req.params.id;
  let name = req.params.restaurant_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: name, owner: foundUser._id }, function (
      err,
      foundRestaurant
    ) {
      if (err) res.render("error", { message: err });
      else {
        res.render("edit_restaurant", {
          title: "Menu Venue: Edit Restaurant",
          user_info: foundUser.local,
          restaurant_info: foundRestaurant,
        });
      }
    });
  });
};

// Handle Restaurant update on POST.
exports.user_restaurant_update_post = function (req, res) {
  // save into database
  let username = req.params.id;
  let restaurant = req.params.restaurant_id;
  let name = req.body.name;
  let cuisine = req.body.cuisine;
  let street = req.body.street;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;
  let phone = req.body.phone;

  res.redirect("/user/" + username);
};

// Display Restaurant delete form on GET.
exports.user_restaurant_delete_get = function (req, res) {
  // delete a restaurant from database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;

  res.redirect("/user/" + user_id);
};

// Handle Restaurant delete on POST.
exports.user_restaurant_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Restaurant delete POST");
};

// Display detail page for a specific Restaurant.
exports.user_restaurant_detail = function (req, res) {
  let username = req.params.id;
  let restaurant = req.params.restaurant_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: restaurant }).then(
      (foundUserRestaurant) => {
        Menu.find({ restaurant: foundUserRestaurant._id }, function (
          err,
          foundUserMenu
        ) {
          if (err) res.render("error", { message: err });
          else {
            res.render("user_restaurant", {
              title: "Menu Venue: Your Menus",
              user_info: foundUser.local,
              restaurant_info: foundUserRestaurant,
              menu_list: foundUserMenu,
            });
          }
        });
      }
    );
  });
};

// Display list of all Restaurants.
exports.user_restaurant_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Restaurant list GET");
};

// user restaurant menu controls

// Display Menu create form on GET.
exports.user_menu_create_get = function (req, res) {
  res.render("create_menu", { restaurant_info: restaurants[0] });
};

// Display Menu create form on POST.
exports.user_menu_create_post = function (req, res) {
  username = req.params.id;
  restaurant = req.params.restaurant_id;
  name = req.body.name;
  description = req.body.description;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: restaurant }).then(
      (foundRestaurant) => {
        Menu.findOne({ restaurant: foundRestaurant._id, name: name }, function (
          err,
          foundMenu
        ) {
          if (err) res.render("error", { message: err });
          else if (foundMenu !== null)
            res.render("create_menu", {
              user_info: foundUser.local,
              restaurant_info: foundRestaurant,
              message: "Menu already exists!",
            });
          else {
            new Menu({
              restaurant: foundRestaurant._id,
              name: name,
            }).save(function (err) {
              if (err) res.render("error", { message: err });
              else {
                res.redirect("/user/" + username + "/restaurant/" + restaurant);
              }
            });
          }
        });
      }
    );
  });
};

// Display Menu update form on GET.
exports.user_menu_update_get = function (req, res) {
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;

  res.render("edit_menu", {
    title: "Menu Venue: Edit Menu",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_info: menus[0],
  });
};

// Handle Menu update on POST.
exports.user_menu_update_post = function (req, res) {
  // save into database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let name = req.body.name;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/all"
  );
};

// Display Menu delete form on GET.
exports.user_menu_delete_get = function (req, res) {
  // delete a menu database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let name = req.body.name;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/all"
  );
};

// Handle Menu delete on POST.
exports.user_menu_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Menu delete POST");
};

// Display detail page for a specific menu.
exports.user_menu_detail = function (req, res) {
  let username = req.params.id;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: restaurant }).then(
      (foundUserRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundUserRestaurant._id }).then(
          (foundUserMenu) => {
            MenuItem.find({ menu: foundUserMenu._id }, function (
              err,
              foundUserItem
            ) {
              if (err) res.render("error", { message: err });
              else {
                res.render("user_restaurant_menu", {
                  title: "Menu Venue: Your Items",
                  user_info: foundUser.local,
                  restaurant_info: foundUserRestaurant,
                  menu_info: foundUserMenu,
                  menu: foundUserItem,
                });
              }
            });
          }
        );
      }
    );
  });
};

// Display list of all Menus.
exports.user_menu_list = function (req, res) {
  // search the database for...
  let restaurant_id = req.params.id;

  res.render("user_restaurant", {
    title: "Menu Venue: All Menus",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_list: [menus[0], menus[1]],
  });
};

// user restaurant menu item controls

// Display Item create form on GET.
exports.user_item_create_get = function (req, res) {
  username = req.params.id;
  restaurant = req.params.restaurant_id;
  menu = req.params.menu_id;

  res.render("create_item", { menu_info: { name: menu } });
};

// Display Item create form on POST.
exports.user_item_create_post = function (req, res) {
  username = req.params.id;
  restaurant = req.params.restaurant_id;
  menu = req.params.menu_id;
  name = req.body.name;
  price = req.body.price;
  description = req.body.description;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: restaurant }).then(
      (foundUserRestaurant) => {
        Menu.findOne({ restaurant: foundUserRestaurant._id, name: menu }).then(
          (foundUserMenu) => {
            MenuItem.find({ menu: foundUserMenu._id }, function (
              err,
              foundUserItem
            ) {
              if (err) res.render("error", { message: err });
              else if (foundUserItem.length === 0) {
                new MenuItem({
                  menu: foundUserMenu._id,
                  name: name,
                  price: price,
                  description: description,
                }).save(function (err, createdItem) {
                  if (err) res.render("error", { message: err });
                  else
                    res.redirect(
                      "/user/" +
                        username +
                        "/restaurant/" +
                        restaurant +
                        "/menu/" +
                        menu
                    );
                });
              } else if (
                foundUserItem.filter((item) => item.name === name).length > 0
              ) {
                res.render("create_item", {
                  user_info: foundUser.local,
                  restaurant_info: foundUserRestaurant,
                  menu_info: foundUserMenu,
                  item: { name: name, price: price, description: description },
                  message: "Item already exists!",
                });
              } else {
                new MenuItem({
                  menu: foundUserMenu._id,
                  name: name,
                  price: price,
                  description: description,
                }).save(function (err, createdItem) {
                  if (err) res.render("error", { message: err });
                  else
                    res.redirect(
                      "/user/" +
                        username +
                        "/restaurant/" +
                        restaurant +
                        "/menu/" +
                        menu
                    );
                });
              }
            });
          }
        );
      }
    );
  });
};

// Display Item update form on GET.
exports.user_item_update_get = function (req, res) {
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;

  res.render("edit_item", {
    title: "Menu Venue: Edit Item",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_info: menus[0],
    item_info: menuItems[0],
  });
};

// Handle Item update on POST.
exports.user_item_update_post = function (req, res) {
  // save into database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/" + menu_id
  );
};

// Display Item delete form on GET.
exports.user_item_delete_get = function (req, res) {
  // delete an item database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/" + menu_id
  );
};

// Handle Item delete on POST.
exports.user_item_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Item delete POST");
};
