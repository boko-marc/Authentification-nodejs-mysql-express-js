const express = require('express');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const passport = require('passport');
const strategy = require('./config/jwtOptions');
const bodyParser = require('body-parser');
cors = require('cors');
var morgan = require('morgan')

// configuration of the rest API
const app = express();
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:true}))
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send({ message: "API auth nodejs sequelize" })
  })
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});



// Database
const db = require('./config/database');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('User table not created,  error'));


// use the strategy
passport.use("strategy" , strategy);


app.use('/auth', authRoutes);


module.exports = app;
