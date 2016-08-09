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
            apellido: null,
            email: null,
            tipo: 1,
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
                        <input type='text' value={this.state.nombre} onChange={this.handleChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellidos</label>
                        <input type='text' value={this.state.apellido} onChange={this.handleChange.bind(this, 'apellido')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Correo Electrónico</label>
                        <input type='text' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tipo de Usuario</label>
                        <select value={this.state.tipo} onChange={this.handleChange.bind(this, 'tipo')}>
                            <option value={1}>Gestor</option>
                            <option value={2}>Abogado</option>
                            <option value={3}>Administrador</option>
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Nombre de Usuario</label>
                        <input type='text' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Contraseña Provisional</label>
                        <input type='text' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
                    </div>
                    <button type='submit' className='submit'>Agregar Usuario</button>
                </form>
            </main>
        );
    },
    handleChange: function (key, event) {
        var state = {};
        state[key] = event.target.value;

        this.setState(state);
    },
    handleAltaUsuario: function (event) {
        event.preventDefault();

        var user = new UserObject();

        user.set({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            tipo: parseInt(this.state.tipo, 10),
            username: this.state.username,
            password: this.state.password,
            usuarioNuevo: true
        });

        user.signUp(null, {
            success: function(user) {
            },
            error: function(user, error) {
            }
        });
    }
});

module.exports = AltaUsuarioForm;
