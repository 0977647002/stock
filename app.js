var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookie = require('cookie-parser');
var app = express();

app.use(session({
    secret: 'this-is-a-secret-token',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 * 60 * 24 }
}));

app.use(cookie());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views')

require('./app/controller/ViewController')(app);
require('./app/api/CategoryApi')(app);
require('./app/api/StockApi')(app);
require('./app/api/UserStockApi')(app);

app.listen(8080, function(err) {
    if (err) {
        console.log(err);
    }
});