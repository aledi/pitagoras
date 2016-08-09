'use strict';

var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 5000;

app.set('port', PORT);

app.use(express.static(path.join(__dirname, '..', 'build')));

// For avoidong Heroku $PORT error
app.listen(PORT, function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
