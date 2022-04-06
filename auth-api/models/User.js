const Sequelize = require('sequelize');
const db = require('../config/database');

// creation of the User model
const User = db.define('user', {
    company :{
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
   
});


module.exports = User;
