const express = require('express');
const router = express.Router();

const restaurant_controller = require('../controllers/restaurantController');

router.get('/', restaurant_controller.index);

module.exports = router;
