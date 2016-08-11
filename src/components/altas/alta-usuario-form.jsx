'use strict';

require('./alta-usuario-form.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

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
            feedbackText: {},
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
                            type='password'
                            value={this.state.password}
                            className={classNames({invalid: this.state.invalidFields.password})}
                            onChange={this.handleChange.bind(this, 'password')} />
                    </div>
                    {this.renderFeedbackText()}
                    <button type='submit' className='submit'>Agregar Usuario</button>
                </form>
            </main>
        );
    },
    renderFeedbackText: function () {
        var feedbackText = this.state.feedbackText;
        if (!feedbackText.text) {
            return;
        }

        return (<p className={classNames('feedback-text', {error: feedbackText.error})}>{feedbackText.text}</p>);
    },
    handleChange: function (key, event) {
        var state = {invalidFields: this.state.invalidFields};
        state[key] = event.target.value;

        if (this.state.feedbackText.text) {
            state.feedbackText = {error: false, text: null};
        }

        if (state.invalidFields[key]) {
            state.invalidFields[key] = false;
        }

        this.setState(state);
    },
    handleAltaUsuario: function (event) {
        event.preventDefault();

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

        var user = new UserObject();
        var currentUser = Parse.User.current();

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

        user.signUp(null).then(function (newUser) {
            Parse.User.become(currentUser.getSessionToken()).then(function (param) {
                self.setState({
                    nombre: null,
                    apellido: null,
                    email: null,
                    tipo: 1,
                    username: null,
                    password: null,
                    feedbackText: {error: false, text: 'El usuario ha sido creado.'}
                });
            });
        }).catch(function (newUser, error) {
            self.setState({feedbackText: {error: true, text: self.getErrorText(error.code)}});
        });
    },
    getErrorText: function (errorCode) {
        switch (errorCode) {
            case 203:
                return 'El correo proporcionado ya está asociado a una cuenta.';
            case 125:
                return 'El formato del correo es inválido.';
            default:
                return 'Error al crear usuario.';
        }
    }
});

module.exports = AltaUsuarioForm;
