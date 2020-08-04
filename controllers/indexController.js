/********************************************************************************************
 * indexController: functions to handle GET and POST requests called from index
 * *****************************************************************************************/

// (!) Note: add the following line below all models:
//     require('../config/passport');

const { users, restaurants, menus, menuItems } = require("../mockData");

exports.index_get = function (req, res) {
  res.render("index", { title: "Menu Venue" });
};

exports.index_post = function (req, res) {
  // search the database for...
  let searchedName = req.body.name;
  let searchedAddress = req.body.address;

  res.render("restaurant_list", {
    title: `Results for ${searchedName}`,
    restaurant_list: [restaurants[0], restaurants[1]],
  });
};
