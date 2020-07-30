const express = require('express');
const router = express.Router();

const restaurant_controller = require('../controllers/menuController');

// Menu routes

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get('/menu/create', menu_controller.menu_create_get);

// POST request for creating Menu.
router.post('/menu/create', menu_controller.menu_create_post);

// GET request to delete Menu.
router.get('//menu/:id/delete', menu_controller.menu_delete_get);

// POST request to delete Menu.
router.post('/menu/:id/delete', menu_controller.menu_delete_post);

// GET request to update Menu.
router.get('/menu/:id/update', menu_controller.menu_update_get);

// POST request to update Menu.
router.post('/menu/:id/update', menu_controller.menu_update_post);

// GET request for one Menu.
router.get('/menu/:id', menu_controller.menu_detail);

// GET request for list of all Menus.
router.get('/menus', menu_controller.menu_list);