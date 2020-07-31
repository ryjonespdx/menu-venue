const mysqlModel = require('mysql-model');

const appModel = mysqlModel.createConnection({
  host:       'database-host',
  user:       'database-user',
  password:   'database-password',
  database :  'database-name'
});

const Restaurant = appModel.extend(
    {
        name: '',
        address: ''
    }
);

//Export model
module.exports = Restaurant;