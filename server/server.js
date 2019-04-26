const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = 8080;
// route requires
const user = require('./routes/user');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
        bodyParser.urlencoded({
                extended: false
        })
)
app.use(bodyParser.json())

// Sessions
app.use(
        session({
                secret: 'dwayne-rock-johnson',
                store: new MongoStore ({ mongooseConnection: dbConnection }), 
                resave: false, //required
                saveUninitialized: false //required
        })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // call the deserializedUser

// routes
app.use('/user', user)

// Starting Server
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})
