'use strict';

require('./alta-usuario-form.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');

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
            password: null,
            invalidFields: {}
        };
    },
    render: function () {
        return (
            <main className='alta-usuario'>
                <form onSubmit={this.handleAltaUsuario}>
                    <p className='section-title'>Nuevo Usuario</p>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input
                            type='text'
                            value={this.state.nombre}
                            className={classNames({invalid: this.state.invalidFields.nombre})}
                            onChange={this.handleChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellidos</label>
                        <input
                            type='text'
                            value={this.state.apellido}
                            className={classNames({invalid: this.state.invalidFields.apellido})}
                            onChange={this.handleChange.bind(this, 'apellido')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Correo Electrónico</label>
                        <input
                            type='text'
                            value={this.state.email}
                            className={classNames({invalid: this.state.invalidFields.email})}
                            onChange={this.handleChange.bind(this, 'email')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tipo de Usuario</label>
                        <select value={this.state.tipo} onChange={this.handleChange.bind(this, 'tipo')}>
                            <option value={1}>Abogado</option>
                            <option value={2}>Gestor</option>
                            <option value={3}>Administrador</option>
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Nombre de Usuario</label>
                        <input
                            type='text'
                            value={this.state.username}
                            className={classNames({invalid: this.state.invalidFields.username})}
                            onChange={this.handleChange.bind(this, 'username')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Contraseña Provisional</label>
                        <input
                            type='text'
                            value={this.state.password}
                            className={classNames({invalid: this.state.invalidFields.password})}
                            onChange={this.handleChange.bind(this, 'password')} />
                    </div>
                    <button type='submit' className='submit'>Agregar Usuario</button>
                    {this.renderFeedbackText()}
                </form>
            </main>
        );
    },
    renderFeedbackText: function () {
        if (!this.state.feedbackText) {
            return;
        }

        return (<p>{this.state.feedbackText}</p>);
    },
    handleChange: function (key, event) {
        var state = {invalidFields: this.state.invalidFields};
        state[key] = event.target.value;

        if (state.invalidFields[key]) {
            state.invalidFields[key] = false;
        }

        this.setState(state);
    },
    handleAltaUsuario: function (event) {
        event.preventDefault();

        var user = new UserObject();
        var state = this.state;
        var invalidFields = false;

        if (!state.nombre || !state.nombre.trim()) {
            state.invalidFields.nombre = true;
            invalidFields = true;
        }

        if (!state.apellido || !state.apellido.trim()) {
            state.invalidFields.apellido = true;
            invalidFields = true;
        }

        if (!state.email || !state.email.trim()) {
            state.invalidFields.email = true;
            invalidFields = true;
        }

        if (!state.username || !state.username.trim()) {
            state.invalidFields.username = true;
            invalidFields = true;
        }

        if (!state.password || !state.password.trim()) {
            state.invalidFields.password = true;
            invalidFields = true;
        }

        if (invalidFields) {
            this.setState(state);
            return;
        }

        user.set({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            tipo: parseInt(this.state.tipo, 10),
            username: this.state.username,
            password: this.state.password,
            usuarioNuevo: true
        });

        var self = this;

        user.signUp(null, {
            success: function (user) {
                self.setState({feedbackText: 'El usuario ha sido creado.'});
            },
            error: function (user, error) {
                self.setState({feedbackText: 'Error al crear el usuario.'});
            }
        });
    }
});

module.exports = AltaUsuarioForm;
