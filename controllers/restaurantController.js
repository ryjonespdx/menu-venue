const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Display 
exports.index = function(req, res) {   
    res.render('index', { title: 'Local Library Home', error: err, data: results });
}

// Display Restaurant create form on GET.
exports.restaurant_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant create GET');
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

// Display list of all Restaurants.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant details GET');
}
exports.restaurant_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant list GET');
}

// Display list of all Restaurants.
exports.restaurant_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant list GET');
}
