const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// READY?! Let's go!

// Import routes
const index = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Exposes a bunch of methods for validating data input
app.use(expressValidator());

app.use(cookieParser());

// After allllll that above middleware, we finally handle our own routes!
app.use('/', index);

// Error Handling

// done! we export it so we can start the site in start.js
module.exports = app;
