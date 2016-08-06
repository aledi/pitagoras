'use strict';

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var ksd = require('./src/index.html');

app.set('port', PORT);

// For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running';
    response.send(ksd);
}).listen(PORT, function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
