const express = require('express');
const router = express.Router();

const restaurant_controller = require('../controllers/restaurantController');

// GET menu-venue home page.
router.get('/', restaurant_controller.index);


// Restaurant routes

// GET request for creating a Restaurant. NOTE This must come before routes that display Restaurant (uses id).
router.get('/restaurant/create', restaurant_controller.restaurant_create_get);

// POST request for creating Restaurant.
router.post('/restaurant/create', restaurant_controller.restaurant_create_post);

// GET request to delete Restaurant.
router.get('/restaurant/:id/delete', restaurant_controller.restaurant_delete_get);

// POST request to delete Restaurant.
router.post('/restaurant/:id/delete', restaurant_controller.restaurant_delete_post);

// GET request to update Restaurant.
router.get('/restaurant/:id/update', restaurant_controller.restaurant_update_get);

// POST request to update Restaurant.
router.post('/restaurant/:id/update', restaurant_controller.restaurant_update_post);

// GET request for one Restaurant.
router.get('/restaurant/:id', restaurant_controller.restaurant_detail);

// GET request for list of all Restaurants.
router.get('/restaurants', restaurant_controller.restaurant_list);

