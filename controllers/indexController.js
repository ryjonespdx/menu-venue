/********************************************************************************************
user = {
    id: '',
    email: '',
    password: '',
    url: ''
}
restaurant = {
    id: '',
    name: '',
    address: '',
    phone: '',
    url: '',
    user_id: ''
}
mene  = {
    id: '',
    name: '',
    url: '',
    restaurant_id: ''
}
item = {
    id: '',
    name: '',
    price: '',
    description: '',
    menu_id: ''
}
  ******************************************************************************************/

/********************************************************************************************
 * indexController: functions to handle GET and POST requests called from home and login
 * *****************************************************************************************/

exports.index_get = function(req, res) {
    res.render('index', { title: 'Menu Venue' });
}

exports.index_post = function(req, res) {

    // search the database for...
    let searchedName = req.body.name;
    let searchedAddress = req.body.address;

    // dummy data returned from MySQL db
    found = [
        {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
        {id: '2', name: 'restaurant2', address: 'address2', phone: '222-2222', url: '/restaurant/2'},
        {id: '3', name: 'restaurant3', address: 'address3', phone: '333-3333', url: '/restaurant/3'}
    ];
    
    res.render('restaurant_list', { title: `Results for ${searchedName} around ${searchedAddress}`, restaurant_list: found });
}

exports.login_get = function(req, res) {
    res.render('login', { title: 'login' });
}

exports.login_post= function(req, res) {

    // search the database for...
    let submittedEmail = req.body.email;
    let submittedPassword = req.body.password;
    
    // dummy data returned from MySQL db
    user = { id: '1', email: 'a@b.com', url: '/user/1' };
    restaurants = [
        {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
        {id: '2', name: 'restaurant2', address: 'address2', phone: '222-2222', url: '/restaurant/2'},
        {id: '3', name: 'restaurant3', address: 'address3', phone: '333-3333', url: '/restaurant/3'}
    ];

    if(true) { // authenticated 
        res.render('user_restaurant', { title: 'Menu Venue: Your Restaurants', user_info: user , restaurant_list: restaurants } );
    }
    else { // no user/wrong password
        res.render('login', { title: 'incorrect!' });
    }
};

exports.register_post= function(req, res) {
    res.render('login', { title: 'you registered!' });
};