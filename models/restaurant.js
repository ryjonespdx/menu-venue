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

const Restaurant = appModel.extend(
    {
        id: '',
        name: '',
        address: '',
    }
);


//Export model
module.exports = Restaurant;