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

var Main = require('./components/main/main');
var Inicio = require('./components/inicio/inicio');
var Signin = require('./components/auth/signin');
var ContratoForm = require('./components/contratos/contrato-form');
var Usuarios = require('./components/usuarios/usuarios');
var Contratos = require('./components/contratos/contratos');
var Reportes = require('./components/reportes/reportes');
var NotFound = require('./components/not-found/not-found');

var Routes = (
    <Route path='/' component={Main}>
        <IndexRoute onEnter={redirectToInicio} />
        <Route path='signin' component={Signin} onEnter={requireNoAuth} />
        <Route path='inicio' component={Inicio} onEnter={requireAuth} />
        <Route path='agregar-contrato' component={ContratoForm} onEnter={requireAuth} />
        <Route path='usuarios' component={Usuarios} onEnter={requireAdminAuth} />
        <Route path='contratos' component={Contratos} onEnter={requireAuth}>
            <Route path=':id' component={Contratos} onEnter={requireAuth} />
        </Route>
        <Route path='reportes' component={Reportes} onEnter={requireAuth} />
        <Route path='*' component={NotFound} />
    </Route>
);

// -----------------------------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------------------------

function redirectToInicio (nextState, replace) {
    replace({
        pathname: '/inicio',
        query: nextState.location.query,
        state: nextState.location.state
    });
}

function requireNoAuth (nextState, replace) {
    // If user isn't authenticated, show sign in.
    if (!Parse.User.current()) {
        return;
    }

    replace('/inicio');
}

function requireAuth (nextState, replace) {
    // If user is authenticated, check for valid session.
    if (Parse.User.current()) {
        Parse.Session.current().catch(handleSessionError);

        return;
    }

    replace({
        pathname: '/signin',
        state: {nextPathname: nextState.location.pathname}
    });
}

function requireAdminAuth (nextState, replace) {
    // If user is authenticated, check for admin permissions.
    var currentUser = Parse.User.current();

    if (currentUser && currentUser.get('tipo') === 3) {
        Parse.Session.current().catch(handleSessionError);
    } else if (currentUser) {
        replace('/access-denied');
    } else {
        replace('/signin');
    }
}

function handleSessionError (error) {
    if (error.code !== Parse.Error.INVALID_SESSION_TOKEN) {
        return;
    }

    Parse.User.logOut().then(function () {
        window.location = '/signin';
    });
}

module.exports = Routes;
