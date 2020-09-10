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

let _db;

const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://kritikasharma:QazFBmIiD3swPzhc@online-shopping-portal.h6buw.mongodb.net/shopDB?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to MongoDB Server');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No databse found!'; 
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
