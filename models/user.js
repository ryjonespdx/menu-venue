const mysqlModel = require('mysql-model');

const appModel = mysqlModel.createConnection({
  host:       'database-host',
  user:       'database-user',
  password:   'database-password',
  database :  'database-name'
});

const User = appModel.extend(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
    }
);

//Export model
module.exports = User;