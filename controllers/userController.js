/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/

const { users, restaurants, menus, menuItems } = require('../mockData');


exports.login_get = function(req, res) {
    res.render('login', { title: 'login' });
}

exports.login_post = function(req, res) {

    // search the database for...
    let submittedEmail = req.body.email;
    let submittedPassword = req.body.password;
    
    
    if(true) { // authenticated
        res.render('user', { title: 'Menu Venue: Your Restaurants', user_info: users[0] , restaurant_list: [ restaurants[0], restaurants[1] ], menu_list: [], menu: [] } );
    }
    else { // no user/wrong password
        res.render('login', { title: 'incorrect!' });
    }
};


// user controls

exports.register_post = function(req, res) {
    res.render('login', { title: 'you registered!' });
};
// Display User create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
}

// Display User create form on POST.
exports.user_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
}

// Display User update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail GET');
}

// Display list of all Users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list GET');
}



// user restaurant controls

// Display Restaurant create form on GET.
exports.user_restaurant_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant create GET');
}

// Display Restaurant create form on POST.
exports.user_restaurant_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant create POST');
}

// Display Restaurant update form on GET.
exports.user_restaurant_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant update GET');
};

// Handle Restaurant update on POST.
exports.user_restaurant_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant update POST');
};

// Display Restaurant delete form on GET.
exports.user_restaurant_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant delete GET');
};

// Handle Restaurant delete on POST.
exports.user_restaurant_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Restaurant delete POST');
};

// Display detail page for a specific Restaurant.
exports.user_restaurant_detail = function(req, res) {

    // search the database for...
    let url = req.params.id;
    
    res.render('user_restaurant', { title: 'Menu Venue: All Menus', user_info: users[0], restaurant_info: restaurants[0], menu_list: menus[0] });
}

// Display list of all Restaurants.
exports.user_restaurant_list = function(req, res) {

    // search the database for all restaurants...

    res.render('restaurant', { title: 'Menu Venue: All Restaurants', restaurant_list: [ restaurants[0], restaurants[1], restaurants[2], restaurants[3] ]});
}



// user restaurant menu controls

// Display Menu create form on GET.
exports.user_menu_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu create GET');
}

// Display Menu create form on POST.
exports.user_menu_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu create POST');
}

// Display Menu update form on GET.
exports.user_menu_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu update GET');
};

// Handle Menu update on POST.
exports.user_menu_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu update POST');
};

// Display Menu delete form on GET.
exports.user_menu_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu delete GET');
};

// Handle Menu delete on POST.
exports.user_menu_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu delete POST');
};

// Display detail page for a specific menu.
exports.user_menu_detail = function(req, res) {

    let restaurant_id = req.params.id;
    let menu_id = req.params.menu_id;

    res.render('user_restaurant_menu', { title: 'Menu Venue: Menu', user_info: users[0], restaurant_info: restaurants[0], menu_info: menus[0], menu: [ menuItems[0], menuItems[1] ] });
}

// Display list of all Menus.
exports.user_menu_list = function(req, res) {

    // search the database for...
    let restaurant_id = req.params.id;

    res.render('user_restaurant', { title: 'Menu Venue: All Menus', user_info: users[0], restaurant_info: restaurants[0], menu_list: [ menus[0], menus[1] ] });
}



// user restaurant menu item controls

// Display Item create form on GET.
exports.user_item_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Item create GET');
}

// Display Item create form on POST.
exports.user_item_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Item create POST');
}

// Display Item update form on GET.
exports.user_item_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Item update GET');
};

// Handle Item update on POST.
exports.user_item_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Item update POST');
};

// Display Item delete form on GET.
exports.user_item_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Item delete GET');
};

// Handle Item delete on POST.
exports.user_item_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Item delete POST');
};