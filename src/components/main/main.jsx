'use strict';

require('./main.scss');

// -----------------------------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var classNames = require('classnames');

// -----------------------------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------------------------

var Main = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    childContextTypes: {user: React.PropTypes.func},
    getChildContext: function () {
        return {user: this.getCurrentUser};
    },
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
            hideMenu: !!component.hideMenu,
            children: props.children,
            title: component.title || 'MISSING_TITLE',

            links: this.state ? this.state.links : {
                inicio: '/inicio',
                agregarContrato: '/agregar-contrato',
                contratos: '/contratos',
                reportes: '/reportes',
                altaUsuario: '/alta-usuario'
            }
        };

        // If route was changed, hide mobile nav & header menu
        if (this.props.location.pathname !== props.location.pathname) {
            state.showMobileNav = false;
            state.showMobileHeaderMenu = false;
        }

        // NOTE: routes[0] is always main, routes[1] is always top level component
        state.links[props.routes[1].path] = props.location.pathname;

        return state;
    },
    render: function () {
        return (
            <div id='pitagoras'>
                {this.renderHeader()}
                {this.renderChildren()}
            </div>
        );
    },
    renderHeader: function () {
        if (this.state.hideMenu) {
            return;
        }

        var isAdmin = this.getCurrentUser().get('tipo') === 3;

        return (
            <header>
                <div className='logo' onClick={this.redirectToInicio} />
                <div className='links-wrapper'>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={this.state.links.inicio}>Inicio</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={this.state.links.agregarContrato}>Agregar contrato</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={this.state.links.contratos}>Ver contratos</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={this.state.links.reportes}>Reportes</Link>
                    {this.renderAgregarUsuarioItem(isAdmin)}
                </div>
                <div className='signout' onClick={this.signOut} />
            </header>
        );
    },
    renderAgregarUsuarioItem: function (isAdmin) {
        if (!isAdmin) {
            return;
        }

        return (<Link activeClassName='active' className='admin' to={this.state.links.altaUsuario}>Agregar usuario</Link>);
    },
    renderChildren: function () {
        return this.state.children;
    },
    signOut: function () {
        Parse.User.logOut().then(function () {
            window.location = '/signin';
        });
    },
    getCurrentUser: function () {
        return Parse.User.current();
    },
    redirectToInicio: function () {
        this.context.router.replace('/inicio');
    }
});

module.exports = Main;
