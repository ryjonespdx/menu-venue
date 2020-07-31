/*************************************************************************************************************
 * user.js : attaches the routes starting with '/user', to its controller in userController.js
**************************************************************************************************************/

const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// GET request for list of all Users.
router.get('/all', user_controller.user_list);

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get('/create', user_controller.user_create_get);

// POST request for creating User.
router.post('/create', user_controller.user_create_post);

// GET request to delete User.
router.get('/:id/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/:id/delete', user_controller.user_delete_post);

// GET request to update User.
router.get('/:id/update', user_controller.user_update_get);

// POST request to update User.
router.post('/:id/update', user_controller.user_update_post);

// GET request for list of all Menus.
router.get('/:id/restaurant/all', user_controller.user_menu_list);

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get('/:id/restaurant/create', user_controller.user_restaurant_create_get);

// POST request for creating Menu.
router.post('/:id/restaurant/create', user_controller.user_restaurant_create_post);

// GET request to delete Menu.
router.get('/:id/restaurant/:restaurant_id/delete', user_controller.user_restaurant_delete_get);

// POST request to delete Menu.
router.post('/:id/restaurant/:restaurant_id/delete', user_controller.user_restaurant_delete_post);

// GET request to update Menu.
router.get('/:id/restaurant/:restaurant_id/update', user_controller.user_restaurant_update_get);

// POST request to update Menu.
router.post('/:id/restaurant/:restaurant_id/update', user_controller.user_restaurant_update_post);

// GET request for one Menu.
router.get('/:id/restaurant/:restaurant_id', user_controller.user_restaurant_detail)


// GET request for list of all Menus.
router.get('/:id/restaurant/:restaurant_id/menu/all', user_controller.user_menu_list);

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get('/:id/restaurant/:restaurant_id/menu/create', user_controller.user_menu_create_get);

// POST request for creating Menu.
router.post('/:id/restaurant/:restaurant_id/menu/create', user_controller.user_menu_create_post);

// GET request to delete Menu.
router.get('/:id/restaurant/:restaurant_id/menu/:menu_id/delete', user_controller.user_menu_delete_get);

// POST request to delete Menu.
router.post('/:id/restaurant/:restaurant_id/menu/:menu_id/delete', user_controller.user_menu_delete_post);

// GET request to update Menu.
router.get('/:id/restaurant/:restaurant_id/menu/:menu_id/update', user_controller.user_menu_update_get);

// POST request to update Menu.
router.post('/:id/restaurant/:restaurant_id/menu/:menu_id/update', user_controller.user_menu_update_post);

// GET request for one Menu.
router.get('/:id/restaurant/:restaurant_id/menu/:menu_id', user_controller.user_menu_detail)


// GET request for one User.
router.get('/:id', user_controller.user_detail);

module.exports = router;