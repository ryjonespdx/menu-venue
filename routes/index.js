/*************************************************************************************************************
 * index.js : attaches the routes '/', '/login' and '/register' to its controller in indexController.js
 ************************************************************************************************************/

const express = require("express");
const router = express.Router();
const index_controller = require("../controllers/indexController");

// Landing page
router.get("/", index_controller.index_get);

// Landing page search req
router.post("/", index_controller.index_post);

// Share item
router.get("/share/:share_id", index_controller.share_get);

// Login page
router.get("/login", index_controller.login_get);

// Login 
router.post("/login", index_controller.login_post);

// Logout req
router.get("/logout", index_controller.logout_get);

// Registration req
router.get("/register", index_controller.register_get);

// Redirects to /user on successful login
router.post("/register", index_controller.register_post);

module.exports = router;
