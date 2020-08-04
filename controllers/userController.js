/********************************************************************************
 * userController: functions to handle GET and POST requests called as a user
 * *****************************************************************************/

const { users, restaurants, menus, menuItems } = require("../mockData");

// user controls

exports.user_get = function (req, res) {
  res.render("login", { title: "login" });
};

exports.user_post = function (req, res) {
  // search the database for...
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username, password: password }, function (
    err,
    found
  ) {
    if (err) res.render("login", { title: "we have issues, try later" });
    else if (!found) res.render("login", { title: "no user found" });
    else res.redirect("/user/" + found.username);
  });
};

// Display detail page for a specific user.
exports.user_detail = function (req, res) {
  let username = req.params.id;

  User.findOne({ username: username }).then((foundUser) => {
    Restaurant.find({ owner: foundUser._id }, function (err, foundRestaurant) {
      if (err) res.render("error", { message: err });
      else {
        console.log(foundRestaurant);
        res.render("user", {
          title: "Menu Venue: Your Restaurants",
          user_info: foundUser,
          restaurant_list: foundRestaurant,
          menu_list: [],
          menu: [],
        });
      }
    });
  });
};

exports.register_get = function (req, res) {
  res.render("create_user", { title: "enter email and create a password" });
};

exports.register_post = function (req, res) {
  // search the database for...
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  // passwords don't match, try again
  if (password[0] !== password[1])
    res.render("create_user", { title: "Passwords do not match!" });

  User.findOne({ username: username }, function (err, found) {
    if (err) res.render("error", { message: err });
    else if (found !== null)
      res.render("create_user", { title: "User already exists!" });
    else {
      new User({
        username: username,
        email: email,
        password: password[0],
      }).save(function (err) {
        if (err) res.render("error", { message: err });
        else res.redirect("/user/" + username);
      });
    }
  });
};

// Display User create form on GET.
exports.user_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User create GET");
};

// Display User create form on POST.
exports.user_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User create POST");
};

// Display User update form on GET.
exports.user_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User update GET");
};

// Handle User update on POST.
exports.user_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User update POST");
};

// Display User delete form on GET.
exports.user_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: User delete GET");
};

// Handle User delete on POST.
exports.user_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: User delete POST");
};

// Display list of all Users.
exports.user_list = function (req, res) {
  res.send("NOT IMPLEMENTED: User list GET");
};

// user restaurant controls

// Display Restaurant create form on GET.
exports.user_restaurant_create_get = function (req, res) {
  res.render("create_restaurant", { user_info: users[0] });
};

// Display Restaurant create form on POST.
exports.user_restaurant_create_post = function (req, res) {
  let username = req.params.id;
  name = req.body.name;
  address = req.body.address;
  number = req.body.number;

  User.findOne({ username: username }).then((foundUser) => {
    Restaurant.findOne({ owner: foundUser._id, name: name }, function (
      err,
      foundRestaurant
    ) {
      if (err) res.render("error", { message: err });
      else if (foundRestaurant !== null)
        res.render("create_restaurant", {
          user_info: foundUser.username,
          message: "Restaurant already exists!",
        });
      else {
        new Restaurant({
          owner: foundUser._id,
          name: name,
          street: address,
          city: "portland",
          zip: "97000",
          state: "oregon",
          number: number,
        }).save(function (err) {
          if (err) res.render("error", { message: err });
          else {
            res.redirect("/user/" + username + "/");
          }
        });
      }
    });
  });
};

// Display Restaurant update form on GET.
exports.user_restaurant_update_get = function (req, res) {
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;

  res.render("edit_restaurant", {
    title: "Menu Venue: Edit Restaurant",
    user_info: users[0],
    restaurant_info: restaurants[0],
  });
};

// Handle Restaurant update on POST.
exports.user_restaurant_update_post = function (req, res) {
  // save into database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let name = req.body.name;
  let address = req.body.phone;
  let phone = req.body.phone;

  res.redirect("/user/" + user_id);
};

// Display Restaurant delete form on GET.
exports.user_restaurant_delete_get = function (req, res) {
  // delete a restaurant from database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let name = req.body.name;
  let address = req.body.phone;
  let phone = req.body.phone;

  res.redirect("/user/" + user_id);
};

// Handle Restaurant delete on POST.
exports.user_restaurant_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Restaurant delete POST");
};

// Display detail page for a specific Restaurant.
exports.user_restaurant_detail = function (req, res) {
  // search the database for...
  let url = req.params.id;

  res.render("user_restaurant", {
    title: "Menu Venue: All Menus",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_list: menus[0],
  });
};

// Display list of all Restaurants.
exports.user_restaurant_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Restaurant list GET");
};

// user restaurant menu controls

// Display Menu create form on GET.
exports.user_menu_create_get = function (req, res) {
  res.render("create_menu", { restaurant_info: restaurants[0] });
};

// Display Menu create form on POST.
exports.user_menu_create_post = function (req, res) {
  user_id = req.params.id;
  restaurant_id = req.params.id;
  name = req.body.name;
  description = req.body.description;

  // save into db under restaurant_id
  if (true)
    // saved
    res.redirect(
      "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/all"
    );
  else
    res.render("create_menu", {
      restaurant_info: restaurants[0],
      message: "Could not save!",
    });
};

// Display Menu update form on GET.
exports.user_menu_update_get = function (req, res) {
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;

  res.render("edit_menu", {
    title: "Menu Venue: Edit Menu",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_info: menus[0],
  });
};

// Handle Menu update on POST.
exports.user_menu_update_post = function (req, res) {
  // save into database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let name = req.body.name;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/all"
  );
};

// Display Menu delete form on GET.
exports.user_menu_delete_get = function (req, res) {
  // delete a menu database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let name = req.body.name;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/all"
  );
};

// Handle Menu delete on POST.
exports.user_menu_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Menu delete POST");
};

// Display detail page for a specific menu.
exports.user_menu_detail = function (req, res) {
  let restaurant_id = req.params.id;
  let menu_id = req.params.menu_id;

  res.render("user_restaurant_menu", {
    title: "Menu Venue: Menu",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_info: menus[0],
    menu: [menuItems[0], menuItems[1]],
  });
};

// Display list of all Menus.
exports.user_menu_list = function (req, res) {
  // search the database for...
  let restaurant_id = req.params.id;

  res.render("user_restaurant", {
    title: "Menu Venue: All Menus",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_list: [menus[0], menus[1]],
  });
};

// user restaurant menu item controls

// Display Item create form on GET.
exports.user_item_create_get = function (req, res) {
  res.render("create_item", { menu_info: menus[0] });
};

// Display Item create form on POST.
exports.user_item_create_post = function (req, res) {
  user_id = req.params.id;
  restaurant_id = req.params.restaurant_id;
  menu_id = req.params.menu_id;
  name = req.body.name;
  price = req.body.price;
  description = req.body.description;

  // save into db under menu_id
  if (true)
    // saved
    res.redirect(
      "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/" + menu_id
    );
  else
    res.render("create_item", {
      menu_info: menus[0],
      message: "Could not save!",
    });
};

// Display Item update form on GET.
exports.user_item_update_get = function (req, res) {
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;

  res.render("edit_item", {
    title: "Menu Venue: Edit Item",
    user_info: users[0],
    restaurant_info: restaurants[0],
    menu_info: menus[0],
    item_info: menuItems[0],
  });
};

// Handle Item update on POST.
exports.user_item_update_post = function (req, res) {
  // save into database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/" + menu_id
  );
};

// Display Item delete form on GET.
exports.user_item_delete_get = function (req, res) {
  // delete an item database
  let user_id = req.params.id;
  let restaurant_id = req.params.restaurant_id;
  let menu_id = req.params.menu_id;
  let item_id = req.params.item_id;
  let name = req.body.name;
  let price = req.body.price;
  let description = req.body.description;

  res.redirect(
    "/user/" + user_id + "/restaurant/" + restaurant_id + "/menu/" + menu_id
  );
};

// Handle Item delete on POST.
exports.user_item_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Item delete POST");
};
