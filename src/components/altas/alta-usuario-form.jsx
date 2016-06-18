'use strict';

require('./alta-usuario-form.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var Parse = require('parse');
var UserObject = Parse.Object.extend('User');

// -----------------------------------------------------------------------------------------------
// Alta Usuario Form
// -----------------------------------------------------------------------------------------------

var AltaUsuarioForm = React.createClass({
    getInitialState: function () {
        return {
            nombre: null,
            apellidos: null,
            email: null,
            tipo: null,
            username: null,
            password: null
        };
    },
    render: function () {
        return (
            <main className='alta-usuario'>
                <form onSubmit={this.handleAltaUsuario}>
                    <p className='section-title'>Nuevo Usuario</p>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input type='text' onChange={this.handleChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellidos</label>
                        <input type='text' onChange={this.handleChange.bind(this, 'apellidos')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Correo Electroónico</label>
                        <input type='text' onChange={this.handleChange.bind(this, 'email')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tipo de Usuario</label>
                        <select onChange={this.handleChange.bind(this, 'tipo')}>
                            <option value={3}>Administrador</option>
                            <option value={2}>Abogado</option>
                            <option value={1}>Gestor</option>
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Nombre de Usuario</label>
                        <input type='text' onChange={this.handleChange.bind(this, 'username')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Contraseña Provisional</label>
                        <input type='text' onChange={this.handleChange.bind(this, 'password')} />
                    </div>
                    <button type='submit'>Agregar Usuario</button>
                </form>
            </main>
        );
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state[propertyName] = event.target.value;

        this.setState(state);
    },
    handleAltaUsuario: function (event) {
        event.preventDefault();

        var user = new UserObject();

        user.set('nombre', this.state.nombre);
        user.set('apellidos', this.state.apellidos);
        user.set('email', this.state.email);
        user.set('tipo', parseInt(this.state.tipo, 10));
        user.set('username', this.state.username);
        user.set('password', this.state.password);
        user.set('usuarioNuevo', true);

        user.signUp(null, {
            success: function(user) {
                alert("Success " + user.id);
            },
            error: function(user, error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
});

module.exports = AltaUsuarioForm;
