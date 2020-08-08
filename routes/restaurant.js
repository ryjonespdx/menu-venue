/*************************************************************************************************************
 * restaurant.js : attaches the routes starting with '/restaurant/' to functions in restaurantController.js
 **************************************************************************************************************/

const express = require("express");
const router = express.Router();
const restaurant_controller = require("../controllers/restaurantController");

// GET request for list of all Restaurants.
router.get("/all", restaurant_controller.restaurant_list);

// GET request for list of all Menus.
// router.get('/:id/menu/all', restaurant_controller.menu_list);

// GET request for one Menu.
router.get("/:id/menu/:menu_id", restaurant_controller.menu_detail);

router.post("/:id/menu/:menu_id", restaurant_controller.share_menu);

// GET request for one Restaurant.
router.get("/:id", restaurant_controller.restaurant_detail);

module.exports = router;
