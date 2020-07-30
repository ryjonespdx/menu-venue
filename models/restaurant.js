const mysqlModel = require('mysql-model');

const appModel = mysqlModel.createConnection({
  host:       'database-host',
  user:       'database-user',
  password:   'database-password',
  database :  'database-name'
});

const Restaurant = appModel.extend(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
    }
);

//Export model
module.exports = Restaurant;