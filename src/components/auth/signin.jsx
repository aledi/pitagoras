'use strict';

require('./signin.scss');

var React = require('react');
var Parse = require('parse');

var Signin = React.createClass({
    getInitialState: function () {
        return {
            email: null,
            password: null
        }
    },
    render: function () {
        return (
            <div className='signin-wrapper'>
                <form onSubmit={this.handleSignIn}>
                    <label>Usuario</label>
                    <input type='text' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
                    <label>Contraseña</label>
                    <input type='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
                    <button type='submit'>Iniciar Sesión</button>
                </form>
            </div>
        );
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state[propertyName] = event.target.value;

        this.setState(state);
    },
    handleSignIn: function (event) {
        event.preventDefault();

        Parse.User.logIn(
            this.state.email,
            this.state.password
        ).then(this.handleAuthSuccess).catch(this.handleAuthError);
    },
    handleAuthSuccess: function (authData) {
    },
    handleAuthError: function (error) {
    }
});

module.exports = Signin;
