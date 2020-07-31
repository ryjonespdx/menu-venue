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

/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/

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
    let url = req.params.id
    
    // dummy data returned from MySQL db
    restaurant = {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
    menus = [
        {id: '1', name: 'menu1', url: '/restaurant/1/menu/1', restaurant_id: '1'},
        {id: '2', name: 'menu2', url: '/restaurant/1/menu/2', restaurant_id: '1'}
    ]

    res.render('restaurant_menu', { title: 'Menu Venue: All Menus', restaurant_info: restaurant, menu_list: menus });
}

// Display list of all Restaurants.
exports.user_restaurant_list = function(req, res) {

    // dummy data returned from MySQL db
    found = [
        {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
        {id: '2', name: 'restaurant2', address: 'address2', phone: '222-2222', url: '/restaurant/2'},
        {id: '3', name: 'restaurant3', address: 'address3', phone: '333-3333', url: '/restaurant/3'}
    ];
    
    res.render('restaurant_list', { title: 'Menu Venue: All Restaurants', restaurant_list: found });
}

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

    // search the database for...
    let restaurant_id = req.params.id
    let menu_id = req.params.menu_id
    
    // dummy data returned from MySQL db
    restaurant = {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
    menus = [
        {id: '1', name: 'menu1', url: '/restaurant/1/menu/1', restaurant_id: '1'},
        {id: '2', name: 'menu2', url: '/restaurant/1/menu/2', restaurant_id: '1'}
    ]
    items = [
        {id: '1', name: 'item1', price: '1.11', description: 'description1'},
        {id: '2', name: 'item2', price: '2.22', description: 'description1'},
        {id: '3', name: 'item3', price: '3.33', description: 'description2'},
        {id: '4', name: 'item4', price: '4.44', description: 'description4'},
    ]

    res.render('restaurant_menu_items', { title: 'Menu Venue: Menu', restaurant_info: restaurant, menu_list: menus, item_list: items });
}

// Display list of all Menus.
exports.user_menu_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu list GET');
}