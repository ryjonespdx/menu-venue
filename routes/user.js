/*************************************************************************************************************
 * user.js : attaches the routes starting with '/user', to its controller in userController.js
 **************************************************************************************************************/

const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

// GET request for one User. (redirected here on successful login)
router.get("/", user_controller.user_detail);

// GET request to delete User.
router.get("/:id/delete", user_controller.user_delete_get);

// POST request to delete User.
router.post("/:id/delete", user_controller.user_delete_post);

// GET request to update User.
router.get("/:id/update", user_controller.user_update_get);

// POST request to update User.
router.post("/:id/update", user_controller.user_update_post);

// GET request for creating a Restaurants. NOTE This must come before routes that display Restaurants (uses id).
router.get("/restaurant/create", user_controller.user_restaurant_create_get);

// POST request for creating Restaurant.
router.post("/restaurant/create", user_controller.user_restaurant_create_post);

// GET request to delete Restaurant.
router.get(
  "/restaurant/:restaurant_id/delete",
  user_controller.user_restaurant_delete_get
);

// POST request to delete Restaurant.
router.post(
  "/restaurant/:restaurant_id/delete",
  user_controller.user_restaurant_delete_post
);

// GET request to update Restaurant.
router.get(
  "/restaurant/:restaurant_id/update",
  user_controller.user_restaurant_update_get
);

// POST request to update Restaurant.
router.post(
  "/restaurant/:restaurant_id/update",
  user_controller.user_restaurant_update_post
);

// GET request for one Restaurant.
router.get(
  "/restaurant/:restaurant_id",
  user_controller.user_restaurant_detail
);

// GET request for list of all Menus.
router.get(
  "/restaurant/:restaurant_id/menu/all",
  user_controller.user_menu_list
);

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get(
  "/restaurant/:restaurant_id/menu/create",
  user_controller.user_menu_create_get
);

// POST request for creating Menu.
router.post(
  "/restaurant/:restaurant_id/menu/create",
  user_controller.user_menu_create_post
);

// GET request to delete Menu.
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id/delete",
  user_controller.user_menu_delete_get
);

// POST request to delete Menu.
router.post(
  "/restaurant/:restaurant_id/menu/:menu_id/delete",
  user_controller.user_menu_delete_post
);

// GET request to update Menu.
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id/update",
  user_controller.user_menu_update_get
);

// POST request to update Menu.
router.post(
  "/restaurant/:restaurant_id/menu/:menu_id/update",
  user_controller.user_menu_update_post
);

// GET request for one Menu.
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id",
  user_controller.user_menu_detail
);

// GET request for creating a Item. NOTE This must come before routes that display Item (uses id).
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id/item/create",
  user_controller.user_item_create_get
);

// POST request for creating Item.
router.post(
  "/restaurant/:restaurant_id/menu/:menu_id/item/create",
  user_controller.user_item_create_post
);

// GET request to delete Item.
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/delete",
  user_controller.user_item_delete_get
);

// POST request to delete Item.
router.post(
  "/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/delete",
  user_controller.user_item_delete_post
);

// GET request to update Item.
router.get(
  "/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/update",
  user_controller.user_item_update_get
);

// POST request to update Item.
router.post(
  "/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/update",
  user_controller.user_item_update_post
);

module.exports = router;
