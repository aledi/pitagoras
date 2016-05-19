'use strict';

// -----------------------------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------------------------

var Parse = require('parse');
var hostConfig = config[window.location.host] || config['*'];

// Initialize Parse
Parse.initialize('ugartePrueba' || hostConfig.appId);
Parse.serverURL = hostConfig.serverURL;

// Export before settings routes given circular dependencies.
module.exports = {
    hostConfig: hostConfig
};

// -----------------------------------------------------------------------------------------------
// React + Routes
// -----------------------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var routes = require('src/routes');

// Render Ugarte
ReactDOM.render(
    <Router history={ReactRouter.browserHistory} routes={routes} />,
    document.getElementById('ugarte-wrapper')
);
