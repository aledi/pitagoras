'use strict';

require('./signin.scss');

var Pitagoras = require('src/pitagoras');
var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var Signin = React.createClass({
    statics: {hideMenu: true},
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {
            email: '',
            password: '',
            emailRequired: false,
            passwordRequired: false,
            submitting: false,
            error: null
        };
    },
    render: function () {
        return (
            <div className='signin-wrapper'>
                <img className='logo' src={require('src/assets/logo.png')} />
                <form onSubmit={this.handleSignIn}>
                    <input
                        type='text'
                        placeholder='Usuario'
                        className={classNames({required: this.state.emailRequired})}
                        value={this.state.email}
                        disabled={this.state.submitting}
                        onChange={this.handleChange.bind(this, 'email', 'emailRequired')} />
                    <input
                        type='password'
                        placeholder='••••••••'
                        className={classNames({required: this.state.passwordRequired})}
                        value={this.state.password}
                        disabled={this.state.submitting}
                        onChange={this.handleChange.bind(this, 'password', 'passwordRequired')} />
                    <p className={classNames('error-text', {hidden: !this.state.error})}>La combinación usuario/contraseña es incorrecta.</p>
                    <button type='submit' disabled={this.state.submitting}>Iniciar Sesión</button>
                </form>
            </div>
        );
    },
    handleChange: function (key, requiredClass, event) {
        var state = {};
        state[key] = event.target.value;

        if (this.state[requiredClass]) {
            state[requiredClass] = false;
        }

        this.setState(state);
    },
    handleSignIn: function (event) {
        event.preventDefault();

        if (this.hasInvalidFields()) {
            return;
        }

        this.setState({submitting: true});

        Parse.User.logIn(
            this.state.email,
            this.state.password
        ).then(this.handleAuthSuccess).catch(this.handleAuthError);
    },
    handleAuthSuccess: function (authData) {
        this.setState({submitting: false});

        Pitagoras.fetchContratos();

        var location = this.props.location;

        // If usuarioNuevo, redirect to inicio to change password
        if (authData.get('usuarioNuevo')) {
            this.context.router.replace({
                pathname: '/',
                state: {newUser: true}
            });

            return;
        }

        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
        } else {
            this.context.router.replace('/');
        }
    },
    handleAuthError: function (error) {
        this.setState({
            error: error.message,
            submitting: false
        });

        return;
    },
    hasInvalidFields: function () {
        var invalidFields = false;
        var email = this.state.email ? this.state.email.trim() : null;
        var password = this.state.password ? this.state.password.trim() : null;

        if (!email) {
            this.setState({emailRequired: true, email: ''});
            invalidFields = true;
        }

        if (!password) {
            this.setState({passwordRequired: true, password: ''});
            invalidFields = true;
        }

        return invalidFields;
    }
});

module.exports = Signin;
