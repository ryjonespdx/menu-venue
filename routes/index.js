/*************************************************************************************************************
 * index.js : attaches the routes '/', '/login' and '/register' to its controller in indexController.js
 ************************************************************************************************************/

const express = require('express');
const router = express.Router();

const index_controller = require('../controllers/indexController');

router.get('/', index_controller.index_get);

router.post('/', index_controller.index_post);

module.exports = router;
