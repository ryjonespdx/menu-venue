/********************************************************************************************
 * indexController: functions to handle GET and POST requests called in index.js
 * *****************************************************************************************/

const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Menu = require('../models/menu');

exports.index_get = function(req, res) {
    res.render('index', { title: 'Menu Venue' });
}

exports.index_post = function(req, res) {

    let searched = new Restaurant ({name: req.body.name, address: req.body.address});

    // dummy items returned from MySQL db
    found = [
        {id: '1', name: 'restaurant1', address: 'address1'},
        {id: '2', name: 'restaurant2', address: 'address2'},
        {id: '3', name: 'restaurant3', address: 'address3'}
    ];
    
    found.forEach(item => console.log(item.id, item.name, item.address));

    res.render('restaurant_list', { title: `Results for ${searched.attributes.name} around ${searched.attributes.address}`, restaurant_list: found });
}

exports.login_get = function(req, res) {
    res.render('login', { title: 'login' });
}

exports.login_post= function(req, res) {
    if(true)
        res.render('user_restaurant', { h2: 'email' , restaurant_list: [ { name: 'this', address: 'there' }, { name: 'that', address: 'yonder' } ] } );
    else
        res.render('login', { title: 'incorrect!' });
};

exports.register_post= function(req, res) {
    res.render('login', { title: 'you registered!' });
};
