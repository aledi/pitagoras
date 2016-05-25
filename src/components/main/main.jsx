'use strict';

require('./main.scss');

// -----------------------------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------------------------

var Pitagoras = require('src/pitagoras');
var React = require('react');
var Parse = require('parse');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// -----------------------------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------------------------

var Main = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var route = (Array.isArray(props.routes) ? props.routes[props.routes.length - 1] : props.routes);
        var component = route.component;
        var state = {
            children: props.children,
            title: component.title || 'MISSING_TITLE',

            // Preserve previous links to keep last child route (e.g. /desarrollos/serena)
            links: this.state ? this.state.links : {
                index: '/index'
            }
        };

        // If route was changed, hide mobile nav & header menu
        if (this.props.location.pathname !== props.location.pathname) {
            state.showMobileNav = false;
            state.showMobileHeaderMenu = false;
        }

        // Update link of top level component (e.g. desarrollos = /desarrollos/serena)
        // NOTE: routes[0] is always main, routes[1] is always top level component (e.g. Desarrollos, Locales, etc)
        state.links[props.routes[1].path] = props.location.pathname;

        return state;
    },
    render: function () {
        return (
            <div id='pitagoras'>
                <header>
                    <div className='logo' />
                    <ul>
                        {this.renderAgregarUsuarioItem()}
                        <li>Agregar contrato</li>
                        <li>Ver contratos</li>
                        <li>Reporte</li>
                    </ul>
                    <div className='signout' onClick={this.signOut}/>
                </header>
                {this.renderChildren()}
            </div>
        );
    },
    renderAgregarUsuarioItem: function () {
        // TODO: render opcion if usuario type === 3
    },
    renderChildren: function () {
        return this.state.children;
    },
    signOut: function () {
        Parse.User.logOut().then(function () {
            window.location = '/signin';
        });
    }
});

module.exports = Main;
