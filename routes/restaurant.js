/*************************************************************************************************************
 * restaurant.js : attaches the routes starting with '/restaurant/' to functions in restaurantController.js
**************************************************************************************************************/

const express = require('express');
const router = express.Router();

const restaurant_controller = require('../controllers/restaurantController');

// GET menu-venue home page.
// router.get('/', restaurant_controller.index);

// GET request for list of all Restaurants.
router.get('/all', restaurant_controller.restaurant_list);

// Restaurant routes

// GET request for creating a Restaurant. NOTE This must come before routes that display Restaurant (uses id).
router.get('/create', restaurant_controller.restaurant_create_get);

// POST request for creating Restaurant.
router.post('/create', restaurant_controller.restaurant_create_post);

// GET request to delete Restaurant.
router.get('/:id/delete', restaurant_controller.restaurant_delete_get);

// POST request to delete Restaurant.
router.post('/:id/delete', restaurant_controller.restaurant_delete_post);

// GET request to update Restaurant.
router.get('/:id/update', restaurant_controller.restaurant_update_get);

// POST request to update Restaurant.
router.post('/:id/update', restaurant_controller.restaurant_update_post);

// GET request for list of all Menus.
router.get('/:id/menu/all', restaurant_controller.menu_list);

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get('/:id/menu/create', restaurant_controller.menu_create_get);

// POST request for creating Menu.
router.post('/:id/menu/create', restaurant_controller.menu_create_post);

// GET request to delete Menu.
router.get('/:id/menu/:menu_id/delete', restaurant_controller.menu_delete_get);

// POST request to delete Menu.
router.post('/:id/menu/:menu_id/delete', restaurant_controller.menu_delete_post);

// GET request to update Menu.
router.get('/:id/menu/:menu_id/update', restaurant_controller.menu_update_get);

// POST request to update Menu.
router.post('/:id/menu/:menu_id/update', restaurant_controller.menu_update_post);

// GET request for one Menu.
router.get('/:id/menu/:menu_id', restaurant_controller.menu_detail)

// GET request for one Restaurant.
router.get('/:id', restaurant_controller.restaurant_detail);


module.exports = router;