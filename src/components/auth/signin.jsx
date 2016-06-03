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
            submitting: false,
            emailRequired: false,
            passwordRequired: false,
            error: null
        };
    },
    render: function () {
        return (
            <div className='signin-wrapper'>
                <form onSubmit={this.handleSignIn}>
                    <label>Usuario</label>
                    <input type='text' className={classNames({required: this.state.emailRequired})} value={this.state.email} disabled={this.state.submitting} onChange={this.handleChange.bind(this, 'email', 'emailRequired')} />
                    <label>Contraseña</label>
                    <input type='password' className={classNames({required: this.state.passwordRequired})} value={this.state.password} disabled={this.state.submitting} onChange={this.handleChange.bind(this, 'password', 'passwordRequired')} />
                    <button type='submit' disabled={this.state.submitting}>Iniciar Sesión</button>
                    <label className={classNames('error', {hidden: !this.state.error})}>La combinación usuario/contraseña es incorrecta.</label>
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

        var invalidFields = false;
        var email = this.state.email;
        var password = this.state.password;

        if (!email) {
            this.setState({emailRequired: true});
            invalidFields = true;
        }

        if (!password) {
            this.setState({passwordRequired: true});
            invalidFields = true;
        }

        if (invalidFields) {
            return;
        }

        this.setState({submitting: true});

        Parse.User.logIn(
            email,
            password
        ).then(this.handleAuthSuccess).catch(this.handleAuthError);
    },
    handleAuthSuccess: function (authData) {
        var location = this.props.location;

        this.setState({submitting: false});

        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
        } else {
            this.context.router.replace('/');
        }
    },
    handleAuthError: function (error) {
        this.setState({error: error.message, submitting: false});

        return;
    }
});

module.exports = Signin;
