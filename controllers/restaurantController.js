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
 * restaurantController: functions to handle GET and POST requests as a visitor
  ******************************************************************************************/

// Display detail page for a specific Restaurant.
exports.restaurant_detail = function(req, res) {

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
exports.restaurant_list = function(req, res) {

    // dummy data returned from MySQL db
    found = [
        {id: '1', name: 'restaurant1', address: 'address1', phone: '111-1111', url: '/restaurant/1'},
        {id: '2', name: 'restaurant2', address: 'address2', phone: '222-2222', url: '/restaurant/2'},
        {id: '3', name: 'restaurant3', address: 'address3', phone: '333-3333', url: '/restaurant/3'}
    ];
    
    res.render('restaurant_list', { title: 'Menu Venue: All Restaurants', restaurant_list: found });
}

// Display detail page for a specific menu.
exports.menu_detail = function(req, res) {

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
exports.menu_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Menu list GET');
}