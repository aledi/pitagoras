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
var Signin = require('src/components/auth/signin');
var AgregarContrato = require('src/components/contratos/agregar-contrato');
var Contratos = require('src/components/contratos/contratos');
var Reportes = require('src/components/reportes/reportes');
var NotFound = require('src/components/not-found/not-found');

var Routes = (
    <Route path='/' component={Main}>
        <IndexRoute onEnter={redirectIndex} />
        <Route path='signin' component={Signin} onEnter={requireNoAuth} />
        <Route path='index' component={Index} onEnter={requireAuth} />
        <Route path='agregar-contrato' component={AgregarContrato} onEnter={requireAuth} />
        <Route path='contratos' component={Contratos} onEnter={requireAuth} />
        <Route path='reportes' component={Reportes} onEnter={requireAuth} />
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

function requireNoAuth (nextState, replace) {
    // If user isn't authenticated, show sign in.
    if (!Parse.User.current()) {
        return;
    }

    replace('/index');
}

function requireAuth (nextState, replace) {
    // If user is authenticated, check for valid session.
    if (Parse.User.current()) {
        Parse.Session.current().catch(function (error) {
            if (error.code !== Parse.Error.INVALID_SESSION_TOKEN) {
                return;
            }

            Parse.User.logOut().then(function () {
                window.location = '/signin';
            });
        });

        return;
    }

    replace({
        pathname: '/signin',
        state: {nextPathname: nextState.location.pathname}
    });
}

module.exports = Routes;
