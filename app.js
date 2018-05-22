require('dotenv').config()

const addAuthentication = require('./authentication');
const session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.listen(process.env.PORT, '0.0.0.0');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, 'client/build')));

addAuthentication(app);

app.get(`/user`, function (req, res) {
    if (req.isAuthenticated()) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.user))
    } else {
        req.session.destroy();
        res.status(403)
        res.send("Authentication failed")
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'))
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
