const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


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

// Display list of all Menus.
exports.author_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu details GET');
}
exports.menu_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu list GET');
}

// Display list of all Menus.
exports.menu_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu list GET');
}
