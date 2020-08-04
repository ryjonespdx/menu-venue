/********************************************************************************************
 * restaurantController: functions to handle GET and POST requests as a visitor
 ******************************************************************************************/

const { users, restaurants, menus, menuItems } = require("../mockData");

// Display detail page for a specific Restaurant.
exports.restaurant_detail = function (req, res) {
  // search the database for...
  let restaurant_id = req.params.id;

  res.render("restaurant", {
    title: "Menu Venue: Restaurant Details",
    restaurant_info: restaurants[restaurant_id],
    menu_list: [menus[1], menus[2]],
  });
};

// Display list of all Restaurants.
exports.restaurant_list = function (req, res) {
  res.render("restaurant_list", {
    title: "Menu Venue: Restaurant List",
    restaurant_list: [restaurants[0], restaurants[1]],
  });
};

// Display detail page for a specific menu.
exports.menu_detail = function (req, res) {
  // search the database for...
  let restaurant_id = req.params.id;
  let menu_id = req.params.menu_id;

  res.render("restaurant_menu", {
    title: "Menu Venue: Menu Details",
    restaurant_info: restaurants[restaurant_id],
    menu_info: menus[0],
    item_list: [menuItems[0]],
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
