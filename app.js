'use strict';

var express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	stylus = require('stylus'),
	bootstrap = require('bootstrap-styl'),
	nib = require('nib');
// var mongoose = require('mongoose');

var routes = require('./routes/index'),
	clientRoutes = require('./routes/client'),
	serverRoutes = require('./routes/server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config')[process.env.NODE_ENV];
if (config.seedDB) {
	require('./config/seed');
}

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', process.env.NODE_ENV === 'production')
    .use(bootstrap())
    .use(nib());
}

var app = express();
// mongoose.connect(config.mongodb);
// mongoose.connection.on('error', function() {
//   console.error('MongoDB Connection Error. Make sure MongoDB is running.');
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware({
  src: __dirname + '/src/stylus',
  dest: __dirname + '/public/stylesheets',
  compile: compile
}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/client', clientRoutes);
app.use('/server', serverRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (process.env.NODE_ENV === 'development') ? err : {}
    });
});


module.exports = app;
