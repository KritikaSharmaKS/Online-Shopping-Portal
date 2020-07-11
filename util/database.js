const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localost',
    user : 'root',
    database : 'node-complete',
    password : '9871709924'
});

module.exports = pool.promise();