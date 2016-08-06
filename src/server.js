'use strict';

var express = require('express');
var path = require('path');

var app = express();

var PORT = process.env.PORT || 5000;

var srcPath = path.join(__dirname, "src");

// Server configuration

app.set("views", srcPath);
app.set('port', PORT);

// For avoidong Heroku $PORT error
app.use('/', express.static(path.join(__dirname, '..', 'build')));

app.listen(PORT, function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
