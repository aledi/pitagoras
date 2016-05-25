'use strict';

require('./signin.scss');

var React = require('react');
var Parse = require('parse');

var Signin = React.createClass({
    statics: {hideMenu: true},
    contextTypes: {router: React.PropTypes.object.isRequired},
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
        var location = this.props.location;

        if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
        } else {
            this.context.router.replace('/');
        }
    },
    handleAuthError: function (error) {
    }
});

module.exports = Signin;
