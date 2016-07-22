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
var Inicio = require('src/components/inicio/inicio');
var Signin = require('src/components/auth/signin');
var ContratoForm = require('src/components/contratos/contrato-form');
var AltaUsuarioForm = require('src/components/altas/alta-usuario-form');
var Contratos = require('src/components/contratos/contratos');
var Reportes = require('src/components/reportes/reportes');
var NotFound = require('src/components/not-found/not-found');

var Routes = (
    <Route path='/' component={Main}>
        <IndexRoute onEnter={redirectToInicio} />
        <Route path='signin' component={Signin} onEnter={requireNoAuth} />
        <Route path='inicio' component={Inicio} onEnter={requireAuth} />
        <Route path='agregar-contrato' component={ContratoForm} onEnter={requireAuth} />
        <Route path='alta-usuario' component={AltaUsuarioForm} onEnter={requireAuth} />
        <Route path='contratos' component={Contratos} onEnter={requireAuth}>
            <Route path=':id' component={Contratos} onEnter={requireAuth} />
        </Route>
        <Route path='reportes' component={Reportes} onEnter={requireAuth}>
            <Route path=':id' component={Reportes} onEnter={requireAuth} />
        </Route>
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
