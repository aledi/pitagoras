'use strict';

// -----------------------------------------------------------------------------------------------
// Parse + React + React-Router
// -----------------------------------------------------------------------------------------------

var Parse = require('parse');
var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

// -----------------------------------------------------------------------------------------------
// Routes + Components
// -----------------------------------------------------------------------------------------------

var Main = require('src/components/main/main');
var Index = require('src/components/index/index');
var NotFound = require('src/components/not-found/not-found');

var Routes = (
    <Route path='/' component={Main}>
        <IndexRoute onEnter={redirectIndex} />
        <Route path='index' component={Index} />
        <Route path='*' component={NotFound} />
    </Route>
);

// -----------------------------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------------------------

function redirectIndex (nextState, replace) {
    // Redirect to either /dashboard or /signin
    replace({
        pathname: '/index',
        query: nextState.location.query,
        state: nextState.location.state
    });
}

module.exports = Routes;
