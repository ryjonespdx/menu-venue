/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/

const { users, restaurants, menus, menuItems } = require('../mockData');

// user controls

exports.user_get = function(req, res) {
    res.render('login', { title: 'login' });
}

exports.user_post = function(req, res) {

    // search the database for...
    let submittedEmail = req.body.email;
    let submittedPassword = req.body.password;

    let found_id = 1;

    if(true) // authenticated
        res.redirect('/user/'+found_id);
    else // no user/wrong password
        res.render('login', { title: 'incorrect!' });
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {

    res.render('user', { title: 'Menu Venue: Your Restaurants', user_info: users[0] , restaurant_list: [ restaurants[0], restaurants[1] ], menu_list: [], menu: [] } );
}

exports.register_get = function(req, res) {
    res.render('create_user', { title: 'enter email and create a password' });
};

exports.register_post = function(req, res) {

    // search the database for...
    let submittedEmail = req.body.email;
    let submittedPassword = req.body.password;

    // create user
    let created_id = 2;

    if(true) // available
        res.redirect('/user/'+created_id);
    else // not valid
        res.render('create_user', { title: 'invalid!' });
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

// Display list of all Users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list GET');
}



// user restaurant controls

// Display Restaurant create form on GET.
exports.user_restaurant_create_get = function(req, res) {

    res.render('create_restaurant', { user_info: users[0] } )
}

// Display Restaurant create form on POST.
exports.user_restaurant_create_post = function(req, res) {
    // res.send('NOT IMPLEMENTED: Restaurant create POST');

    user_id = req.params.id;
    name = req.body.name;
    address = req.body.address;
    phone = req.body.phone;

    // save into db under user_id
    if(true) // saved
        res.redirect('/user/'+user_id);
    else
        res.render('create_restaurant', { user_info: users[0], message: 'Could not save!' } )
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

    res.render('create_menu', { restaurant_info: restaurants[0] } )
}

// Display Menu create form on POST.
exports.user_menu_create_post = function(req, res) {

    user_id = req.params.id;
    restaurant_id = req.params.id;
    name = req.body.name;
    description = req.body.description;

    // save into db under restaurant_id
    if(true) // saved
        res.redirect('/user/'+user_id+'/restaurant/'+restaurant_id+'/menu/all');
    else
        res.render('create_menu', { restaurant_info: restaurants[0], message: 'Could not save!' } )
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

    res.render('create_item', { menu_info: menus[0] } )
}

// Display Item create form on POST.
exports.user_item_create_post = function(req, res) {

    user_id = req.params.id;
    restaurant_id = req.params.id;
    menu_id = req.params.id;
    name = req.body.name;
    price = req.body.price;
    description = req.body.description;

    // save into db under menu_id
    if(true) // saved
        res.redirect('/user/'+user_id+'/restaurant/'+restaurant_id+'/menu/'+menu_id);
    else
        res.render('create_item', { menu_info: menus[0], message: 'Could not save!' } )
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