'use strict';

require('./signin.scss');

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var Signin = React.createClass({
    statics: {hideMenu: true},
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {
            email: null,
            password: null,
            emailRequired: false,
            passwordRequired: false,
            submitting: false,
            error: null
        };
    },
    render: function () {
        return (
            <div className='signin-wrapper'>
                <form onSubmit={this.handleSignIn}>
                    <label>Usuario</label>
                    <input
                        type='text'
                        className={classNames({required: this.state.emailRequired})}
                        value={this.state.email}
                        disabled={this.state.submitting}
                        onChange={this.handleChange.bind(this, 'email', 'emailRequired')} />
                    <label>Contraseña</label>
                    <input
                        type='password'
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
    handleChange: function (propertyName, requiredClass, event) {
        var state = {};
        state[propertyName] = event.target.value;

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

        var location = this.props.location;

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
