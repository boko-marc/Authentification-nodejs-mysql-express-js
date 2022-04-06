const Sequelize = require('sequelize');
require('dotenv').config()
// configure this with your own parameters
const database = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
});

module.exports = database;
