'use strict';

var express = require('express');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 5000;

// Server configuration

app.set('port', PORT);

// For avoidong Heroku $PORT error
app.use(require('src'));

app.listen(PORT, function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
