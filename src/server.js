'use strict';

var express = require('express');
var app = express();
var pitagoras = require('./index.html');
var PORT = process.env.PORT || 5000;

app.set('port', PORT);

// For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    response.send(pitagoras);
}).listen(PORT, function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
