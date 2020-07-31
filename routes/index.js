/*************************************************************************************************************
 * index.js : attaches the routes '/', '/login' and '/register' to its controller in indexController.js
 ************************************************************************************************************/

const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/indexController');

router.get('/', index_controller.index_get);

router.post('/', index_controller.index_post);

router.get('/login', index_controller.login_get);

router.post('/login', index_controller.login_post);

router.post('/register', index_controller.register_post);


module.exports = router;