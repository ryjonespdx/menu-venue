/********************************************************************************************
 * restaurantController: functions to handle GET and POST requests as a visitor
 ******************************************************************************************/

// (!) Note: add the following line below all models:
//     require('../config/passport');
var Restaurant = require("../models/restaurant");
var Menu = require("../models/menu");
var MenuItem = require("../models/menuitem");

const { users, restaurants, menus, menuItems } = require("../mockData");
const restaurant = require("../models/restaurant");

// Display detail page for a specific Restaurant.
exports.restaurant_detail = function (req, res) {
  // search the database for...
  let restaurant = req.params.id;

  Restaurant.findOne({ name: restaurant })
    .then( foundRestaurant => {
      Menu.find({ restaurant: foundRestaurant._id }, function(err, foundMenu) {
        if(err)
          res.render('error', { message: err } );
        else {
          res.render("restaurant", {
            title: "Menu Venue: Restaurant Details",
            restaurant_info: foundRestaurant,
            menu_list: foundMenu
          });
        }
      });
     });
};

exports.share_menu = function (req, res) {

  let restaurant = req.params.id;
  let menu = req.params.menu_id;

  Restaurant.findOne({ name: restaurant })
    .then( foundRestaurant => {
      Menu.findOne({ name: menu, restaurant: foundRestaurant._id })
        .then( foundMenu => {
          MenuItem.find({ menu: foundMenu._id }, 
            function(err, foundItem) {
              if(err) res.render('error', { message: err } );
              else {
                res.render("restaurant_menu", {
                  title: "Menu Venue: Menu Details",
                  restaurant_info: foundRestaurant,
                  menu_info: foundMenu,
                  item_list: foundItem
                });
              }
            });
          });
    });
};


// Display list of all Restaurants.
exports.restaurant_list = function (req, res) {

  Restaurant.find({}, function(err, found) {
    res.render("restaurant_list", { 
      title: "Menu Venue: Restaurant List", 
      restaurant_list: found
    });
  });
};

// Display detail page for a specific menu.
exports.menu_detail = function (req, res) {
  // search the database for...
  let restaurant = req.params.id;
  let menu = req.params.menu_id;

  Restaurant.findOne({ name: restaurant })
    .then( foundRestaurant => {
      Menu.findOne({ name: menu, restaurant: foundRestaurant._id })
        .then( foundMenu => {
          MenuItem.find({ menu: foundMenu._id }, 
            function(err, foundItem) {
              if(err) res.render('error', { message: err } );
              else {
                res.render("restaurant_menu", {
                  title: "Menu Venue: Menu Details",
                  restaurant_info: foundRestaurant,
                  menu_info: foundMenu,
                  item_list: foundItem
                });
              }
            });
          });
    });
};

// Display list of all Menus.
exports.menu_list = function (req, res) {
  // search the database for all menus of restaurant
  let restaurant_id = req.params.id;

  res.render("restaurant", {
    title: "Menu Venue: All Menus",
    restaurant_info: restaurants[0],
    menu_list: [menus[0], menus[1]],
  });
};

