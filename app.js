const express = require('express');
const session = require('express-session');
const { isLogIn } = require('./helpers/helper');
const Router = require('./routes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'postgres',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use('/', Router);

app.listen(PORT, () => {
    console.log(`Open app in http://localhost:3000`)
})