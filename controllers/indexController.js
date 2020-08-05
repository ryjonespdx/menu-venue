/********************************************************************************************
 * indexController: functions to handle GET and POST requests called from index
 * *****************************************************************************************/

// (!) Note: add the following line below all models:
//     require('../config/passport');

var Restaurant = require("../models/restaurant");
require("../config/passport");

const { users, restaurants, menus, menuItems } = require("../mockData");

exports.index_get = function (req, res) {
  res.render("index", { title: "Menu Venue" });
};

exports.index_post = function (req, res) {
  // search the database for...
  let searched = req.body.name;

  Restaurant.find({ name: searched }, function(err, found ) {

      if(err) 
          res.render('error', { message: 'we have issues, try later' });
      else if (found.length === 0)
          res.render('index', { restaurant_info: {name: searched}, title: 'no restaurant found' });
      else
          res.render("restaurant_list", {
            title: `Results for ${searched}`,
            restaurant_list: found
  });
  });


};
