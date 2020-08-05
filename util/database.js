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

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', '9871709924', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;

//--------------------------------------------------------
//Use MongoDB

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://kritikasharma:QazFBmIiD3swPzhc@online-shopping-portal.h6buw.mongodb.net/<dbname>?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to MongoDB Server');
            callback(client);
        })
        .catch(err => console.log(err));
};


module.exports = mongoConnect;

