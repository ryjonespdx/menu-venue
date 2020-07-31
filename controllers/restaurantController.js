/********************************************************************************************
 * restaurantController: functions to handle GET and POST requests called in restaurant.js
 * *****************************************************************************************/

const Restaurant = require('../models/restaurant');
const User = require('../models/user');

// Display Restaurant create form on GET.
exports.restaurant_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Restaurant create GET');
    res.render('user_restaurant_form', {});
}

// Display Restaurant create form on POST.
exports.restaurant_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant create POST');
}

// Display Restaurant update form on GET.
exports.restaurant_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant update GET');
};

// Handle Restaurant update on POST.
exports.restaurant_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant update POST');
};

// Display Restaurant delete form on GET.
exports.restaurant_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant delete GET');
};

// Handle Restaurant delete on POST.
exports.restaurant_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant delete POST');
};

// Display detail page for a specific user.
exports.restaurant_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant detail GET');
}

// Display list of all Restaurants.
exports.restaurant_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant list GET');
    // res.render('restaurant_list', { title: 'Menu Venue', restaurant_list: [ { name: 'guido', address: 'first' } ] });
}

// Display Menu create form on GET.
exports.menu_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu create GET');
}

// Display Menu create form on POST.
exports.menu_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu create POST');
}

// Display Menu update form on GET.
exports.menu_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu update GET');
};

// Handle Menu update on POST.
exports.menu_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu update POST');
};

// Display Menu delete form on GET.
exports.menu_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu delete GET');
};

// Handle Menu delete on POST.
exports.menu_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu delete POST');
};

// Display detail page for a specific menu.
exports.menu_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu detail GET');
}

// Display list of all Menus.
exports.menu_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu list GET');
}