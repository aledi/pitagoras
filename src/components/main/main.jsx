'use strict';

require('./main.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var classNames = require('classnames');

var Pitagoras = require('src/pitagoras');

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
    componentDidMount: function () {
        Pitagoras.fetchContratos();
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

            links: this.state ? this.state.links : {
                inicio: '/inicio',
                agregarContrato: '/agregar-contrato',
                contratos: '/contratos',
                reportes: '/reportes',
                altaUsuario: '/alta-usuario'
            }
        };

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
        var links = this.state.links;

        return (
            <header>
                <div className='links-wrapper'>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.inicio}>Inicio</Link>
                    {this.renderAgregarContrato(isAdmin)}
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.contratos}>Ver contratos</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.reportes}>Reportes</Link>
                    {this.renderAgregarUsuarioItem(isAdmin)}
                </div>
                <div className='signout' onClick={this.signOut} title='Cerrar sesión'>
                    <img src={require('src/assets/signOut.png')} />
                </div>
            </header>
        );
    },
    renderAgregarUsuarioItem: function (isAdmin) {
        if (!isAdmin) {
            return;
        }

        return (<Link activeClassName='active' className='admin' to={this.state.links.altaUsuario}>Agregar usuario</Link>);
    },
    renderAgregarContrato: function (isAdmin) {
        if (!isAdmin) {
            return;
        }

        return (<Link activeClassName='active' className='admin' to={this.state.links.agregarContrato}>Agregar contrato</Link>);
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
    }
});

module.exports = Main;
