'use strict';

require('moment').locale('es-MX');

// -----------------------------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------------------------

var Parse = require('parse');
var hostConfig = 'https://pitagoras-server.herokuapp.com/pitagoras';

// Initialize Parse
Parse.initialize('pitagoras');
Parse.serverURL = hostConfig.serverURL;

var ContratosActions = require('src/actions/contratos-actions');

function fetchContratos () {
    if (!Parse.User.current()) {
        return;
    }

    ContratosActions.fetchContratos();
}

// Export before settings routes given circular dependencies.
module.exports = {
    hostConfig: hostConfig,
    fetchContratos: fetchContratos
};

// -----------------------------------------------------------------------------------------------
// React + Routes
// -----------------------------------------------------------------------------------------------

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var routes = require('src/routes');

// Render Pitagoras
ReactDOM.render(
    <Router history={ReactRouter.browserHistory} routes={routes} />,
    document.getElementById('pitagoras-wrapper')
);
