/*************************************************************************************************************
 * user.js : attaches the routes starting with '/user', to its controller in userController.js
 **************************************************************************************************************/

const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

// requests from login and register page

router.get("/", user_controller.user_get);

router.get("/register", user_controller.register_get);

// router.post("/register", user_controller.register_post);
router.post("/register", user_controller.signup);

// POST request for one User. (redirects '/:id' on successful login)
// router.post("/", user_controller.user_post);
router.post("/", user_controller.login);

// GET request for one User. (redirected here on successful login)
router.get("/:id", user_controller.user_detail);

// requests from user (signed in)

// GET request for list of all Users.
router.get("/all", user_controller.user_list);

// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get("/create", user_controller.user_create_get);

// POST request for creating User.
router.post("/create", user_controller.user_create_post);

// GET request to delete User.
router.get("/:id/delete", user_controller.user_delete_get);

// POST request to delete User.
router.post("/:id/delete", user_controller.user_delete_post);

// GET request to update User.
router.get("/:id/update", user_controller.user_update_get);

// POST request to update User.
router.post("/:id/update", user_controller.user_update_post);

// GET request for creating a Restaurants. NOTE This must come before routes that display Restaurants (uses id).
router.get(
  "/:id/restaurant/create",
  user_controller.user_restaurant_create_get
);

// POST request for creating Restaurant.
router.post(
  "/:id/restaurant/create",
  user_controller.user_restaurant_create_post
);

// GET request to delete Restaurant.
router.get(
  "/:id/restaurant/:restaurant_id/delete",
  user_controller.user_restaurant_delete_get
);

// POST request to delete Restaurant.
router.post(
  "/:id/restaurant/:restaurant_id/delete",
  user_controller.user_restaurant_delete_post
);

// GET request to update Restaurant.
router.get(
  "/:id/restaurant/:restaurant_id/update",
  user_controller.user_restaurant_update_get
);

// POST request to update Restaurant.
router.post(
  "/:id/restaurant/:restaurant_id/update",
  user_controller.user_restaurant_update_post
);

// GET request for one Restaurant.
router.get(
  "/:id/restaurant/:restaurant_id",
  user_controller.user_restaurant_detail
);

// GET request for list of all Menus.
router.get(
  "/:id/restaurant/:restaurant_id/menu/all",
  user_controller.user_menu_list
);

// GET request for creating a Menu. NOTE This must come before routes that display Menu (uses id).
router.get(
  "/:id/restaurant/:restaurant_id/menu/create",
  user_controller.user_menu_create_get
);

// POST request for creating Menu.
router.post(
  "/:id/restaurant/:restaurant_id/menu/create",
  user_controller.user_menu_create_post
);

// GET request to delete Menu.
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/delete",
  user_controller.user_menu_delete_get
);

// POST request to delete Menu.
router.post(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/delete",
  user_controller.user_menu_delete_post
);

// GET request to update Menu.
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/update",
  user_controller.user_menu_update_get
);

// POST request to update Menu.
router.post(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/update",
  user_controller.user_menu_update_post
);

// GET request for one Menu.
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id",
  user_controller.user_menu_detail
);

// GET request for creating a Item. NOTE This must come before routes that display Item (uses id).
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/create",
  user_controller.user_item_create_get
);

// POST request for creating Item.
router.post(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/create",
  user_controller.user_item_create_post
);

// GET request to delete Item.
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/delete",
  user_controller.user_item_delete_get
);

// POST request to delete Item.
router.post(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/delete",
  user_controller.user_item_delete_post
);

// GET request to update Item.
router.get(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/update",
  user_controller.user_item_update_get
);

// POST request to update Item.
router.post(
  "/:id/restaurant/:restaurant_id/menu/:menu_id/item/:item_id/update",
  user_controller.user_item_update_post
);

module.exports = router;
