/*******************************************************************
 * usage examples at https://www.npmjs.com/package/mysql-model
 * *****************************************************************/

const mysqlModel = require('mysql-model');

const appModel = mysqlModel.createConnection({
  host:       'database-host',
  user:       'database-user',
  password:   'database-password',
  database :  'database-name'
});

const User = appModel.extend(
    {
        id: '',
        email:'',
        password: '',
        url: ''
    }
);

module.exports = User;