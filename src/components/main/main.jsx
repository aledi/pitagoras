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
        var state = this.getState(this.props);
        state.showingMobileHeader = false;

        return state;
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
                usuarios: '/usuarios'
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
                <div className={classNames('links-wrapper', {hidden: !this.state.showingMobileHeader})}>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.inicio}>Inicio</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={this.state.links.agregarContrato}>Agregar contrato</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.contratos}>Ver contratos</Link>
                    <Link activeClassName='active' className={classNames({admin: isAdmin})} to={links.reportes}>Reportes</Link>
                    {this.renderAgregarUsuarioItem(isAdmin)}
                    <div className='signout-option' onClick={this.signOut}>Cerrar sesión</div>
                </div>
                <div className='signout-menu-wrapper'>
                    <div className='signout-wrapper' onClick={this.signOut} title='Cerrar sesión'>
                        <img src={require('src/assets/signOut.png')} />
                    </div>
                    <button onClick={this.toggleMobileHeader}>-</button>
                </div>
            </header>
        );
    },
    renderChildren: function () {
        return this.state.children;
    },
    renderAgregarUsuarioItem: function (isAdmin) {
        if (!isAdmin) {
            return;
        }

        return (<Link activeClassName='active' className='admin' to={this.state.links.usuarios}>Usuarios</Link>);
    },
    toggleMobileHeader: function () {
        this.setState({showingMobileHeader: !this.state.showingMobileHeader});
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
