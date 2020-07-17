// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     database : 'node-complete',
//     password : '9871709924'
// });

// module.exports = pool.promise();

//------------------------------------------------------
// Use Sequelize

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '9871709924', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;