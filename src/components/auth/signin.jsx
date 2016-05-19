'use strict';

require('./signin.scss');

var React = require('react');

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
                <form>
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

        console.log(state)

        this.setState(state);
    }
});

module.exports = Signin;
