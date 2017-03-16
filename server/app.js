"use strict";
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');

let apiLayer = require('./app-api/routes/index');
let adminApiLayer = require('./app-api/routes/admin');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/dist')));

app.use('/api', apiLayer);
app.use('/api/admin', adminApiLayer);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'app/dist/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('pages/error', {
			title: "Error...",
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('pages/error', {
		title: "Error...",
		message: err.message,
		error: {}
	});
});


module.exports = app;
