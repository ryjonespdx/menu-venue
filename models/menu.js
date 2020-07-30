const mysqlModel = require('mysql-model');

const appModel = mysqlModel.createConnection({
  host:       'database-host',
  user:       'database-user',
  password:   'database-password',
  database :  'database-name'
});

const Menu = appModel.extend(
    {
        name: {type: String, required: true},
    }
);

//Export model
module.exports = Menu;