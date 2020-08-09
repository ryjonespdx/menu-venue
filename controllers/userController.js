/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/
// const config = require("../config/config");
const axios = require("axios");
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var Menu = require("../models/menu");
var MenuItem = require("../models/menuitem");

const { users, restaurants, menus, menuItems } = require("../mockData");

// Display detail page for a specific user.
exports.user_detail = function (req, res) {
  var username;
  if (req.session.username) {
    username = req.session.username;
  } else {
    return res.redirect("/login");
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
  let username = req.session.username;

  res.render("create_restaurant", {
    title: "Menu Venue: Create Restaurant",
    user_info: { username: username },
  });
};

// Display Restaurant create form on POST.
exports.user_restaurant_create_post = function (req, res) {
  let username = req.session.username;
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
          title: "Menu Venue: Create Restaurant",
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
        }).save(function (err, created) {
          if (err) res.render("error", { message: err });
          else {
            let address = `${street} ${city} ${state}`;
            axios
              .get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_KEY}`
              )
              .then((response) => {
                if (response.data.results[0]) {
                  Restaurant.findOneAndUpdate(
                    { name: name, owner: foundUser._id },
                    {
                      lat: response.data.results[0].geometry.location.lat,
                      lng: response.data.results[0].geometry.location.lng,
                    },
                    { new: true },
                    function (err, updatedRestaurant) {
                      if (err) res.render("error", { message: err });
                      else res.redirect("/user");
                    }
                  );
                } else res.redirect("/user");
              });
          }
        });
      }
    });
  });
};

// Display Restaurant update form on GET.
exports.user_restaurant_update_get = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }, function (
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
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let name = req.body.name;
  let cuisine = req.body.cuisine;
  let street = req.body.street;
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;
  let phone = req.body.number;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOneAndUpdate(
      { name: restaurant, owner: foundUser._id },
      {
        name: name,
        cuisine: cuisine,
        street: street,
        city: city,
        state: state,
        zip: zip,
        number: phone,
      },
      { new: true },
      function (err, updatedRestaurant) {
        if (err) res.render("error", { message: err });
        else {
          let address = `${street} ${city} ${state}`;
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_KEY}`
            )
            .then((response) => {
              if (response.data.results[0]) {
                Restaurant.findOneAndUpdate(
                  { name: name, owner: foundUser._id },
                  {
                    lat: response.data.results[0].geometry.location.lat,
                    lng: response.data.results[0].geometry.location.lng,
                  },
                  { new: true },
                  function (err, updatedRestaurant) {
                    if (err) res.render("error", { message: err });
                    else res.redirect("/user");
                  }
                );
              } else res.redirect("/user");
            });
        }
      }
    );
  });
};

// Display Restaurant delete form on GET.
exports.user_restaurant_delete_get = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;

  User.findOne({ "local.username": username })
    .then((foundUser) => {
      Restaurant.findOne({ name: restaurant, owner: foundUser._id })
        .then((foundRestaurant) => {
          Menu.find({ restaurant: foundRestaurant._id })
            .then((foundMenu) => {
              foundMenu.forEach((foundMenu) => {
                MenuItem.deleteMany({ menu: foundMenu._id }, function (
                  err,
                  deleted
                ) {});
              });
            })
            .then(
              Menu.deleteMany({ restaurant: foundRestaurant._id }, function (
                err,
                deleted
              ) {})
            );
        })
        .then(
          Restaurant.deleteOne(
            { name: restaurant, owner: foundUser._id },
            function (err, deleted) {}
          )
        );
    })
    .then((retVal) => res.redirect("/user/"));
};

// Handle Restaurant delete on POST.
exports.user_restaurant_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Restaurant delete POST");
};

// Display detail page for a specific Restaurant.
exports.user_restaurant_detail = function (req, res) {
  let username = req.session.username;
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
  username = req.session.username;
  restaurant = req.params.restaurant_id;

  res.render("create_menu", {
    title: "Menu Venue: Create Menu",
    restaurant_info: { name: restaurant },
  });
};

// Display Menu create form on POST.
exports.user_menu_create_post = function (req, res) {
  username = req.session.username;
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
              title: "Menu Venue: Create Menu",
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
                res.redirect("/user/restaurant/" + restaurant);
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
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }).then(
      (foundRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundRestaurant._id }, function (
          err,
          foundMenu
        ) {
          if (err) res.render("error", { message: err });
          else {
            res.render("edit_menu", {
              title: "Menu Venue: Edit Menu",
              user_info: foundUser.local,
              restaurant_info: foundRestaurant,
              menu_info: foundMenu,
            });
          }
        });
      }
    );
  });
};

// Handle Menu update on POST.
exports.user_menu_update_post = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;
  let name = req.body.name;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }).then(
      (foundRestaurant) => {
        Menu.findOneAndUpdate(
          { name: menu, restaurant: foundRestaurant._id },
          {
            name: name,
          },
          { new: true },
          function (err, updatedMenu) {
            if (err) res.render("error", { message: err });
            else res.redirect("/user/restaurant/" + restaurant);
          }
        );
      }
    );
  });
};

// Display Menu delete form on GET.
exports.user_menu_delete_get = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id })
      .then((foundRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundRestaurant._id })
          .then((foundMenu) => {
            MenuItem.deleteMany({ menu: foundMenu._id }, function (
              err,
              deleted
            ) {});
          })
          .then(
            Menu.deleteOne(
              { name: menu, restaurant: foundRestaurant._id },
              function (err, deleted) {}
            )
          );
      })
      .then((retVal) => res.redirect("/user/restaurant/" + restaurant));
  });
};

// Handle Menu delete on POST.
exports.user_menu_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Menu delete POST");
};

// Display detail page for a specific menu.
exports.user_menu_detail = function (req, res) {
  let username = req.session.username;
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
  username = req.session.username;
  restaurant = req.params.restaurant_id;
  menu = req.params.menu_id;

  res.render("create_item", {
    title: "Menu Venue: Create Item",
    menu_info: { name: menu },
  });
};

// Display Item create form on POST.
exports.user_item_create_post = function (req, res) {
  username = req.session.username;
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
                      "/user/" + "/restaurant/" + restaurant + "/menu/" + menu
                    );
                });
              } else if (
                foundUserItem.filter((item) => item.name === name).length > 0
              ) {
                res.render("create_item", {
                  title: "Menu Venue: Create Item",
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
                      "/user/" + "/restaurant/" + restaurant + "/menu/" + menu
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
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;
  let item = req.params.item_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }).then(
      (foundRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundRestaurant._id }).then(
          (foundMenu) => {
            MenuItem.findOne({ name: item, menu: foundMenu._id }, function (
              err,
              foundItem
            ) {
              if (err) res.render("error", { message: err });
              else {
                res.render("edit_item", {
                  title: "Menu Venue: Edit Item",
                  user_info: foundUser.local,
                  restaurant_info: foundRestaurant,
                  menu_info: foundMenu,
                  item_info: foundItem,
                });
              }
            });
          }
        );
      }
    );
  });
};

// Handle Item update on POST.
exports.user_item_update_post = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;
  let item = req.params.item_id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }).then(
      (foundRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundRestaurant._id }).then(
          (foundMenu) => {
            MenuItem.findOneAndUpdate(
              { name: item, menu: foundMenu._id },
              {
                name: name,
                price: price,
                description: description,
              },
              { new: true },
              function (err, updatedItem) {
                if (err) res.render("error", { message: err });
                else
                  res.redirect(
                    "/user/" + "/restaurant/" + restaurant + "/menu/" + menu
                  );
              }
            );
          }
        );
      }
    );
  });
};

// Display Item delete form on GET.
exports.user_item_delete_get = function (req, res) {
  let username = req.session.username;
  let restaurant = req.params.restaurant_id;
  let menu = req.params.menu_id;
  let item = req.params.item_id;

  User.findOne({ "local.username": username }).then((foundUser) => {
    Restaurant.findOne({ name: restaurant, owner: foundUser._id }).then(
      (foundRestaurant) => {
        Menu.findOne({ name: menu, restaurant: foundRestaurant._id })
          .then((foundMenu) => {
            MenuItem.deleteOne({ name: item, menu: foundMenu._id }, function (
              err,
              deleted
            ) {});
          })
          .then((retVal) =>
            res.redirect("/user/restaurant/" + restaurant + "/menu/" + menu)
          );
      }
    );
  });
};

// Handle Item delete on POST.
exports.user_item_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Item delete POST");
};
