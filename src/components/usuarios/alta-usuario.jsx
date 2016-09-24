'use strict';

require('./alta-usuario.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var UsuariosActions = require('src/actions/usuarios-actions');

// -----------------------------------------------------------------------------------------------
// AltaUsuario
// -----------------------------------------------------------------------------------------------

var AltaUsuario = React.createClass({
    getInitialState: function () {
        var usuario = this.props.usuario || {};

        return {
            nombre: usuario.nombre || '',
            apellido: usuario.apellido || '',
            email: usuario.email || '',
            tipo: usuario.tipo || 1,
            username: usuario.username || '',
            password: '',
            usuarioNuevo: this.props.usuario ? usuario.usuarioNuevo : true,
            feedbackText: {},
            invalidFields: {}
        };
    },
    render: function () {
        return (
            <div className='alta-usuario'>
                <form onSubmit={this.handleAltaUsuario}>
                    <p className='section-title'>{(this.props.usuario ? 'Editar ' : 'Agregar ') + 'Usuario'}</p>
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
                    {this.renderPassword()}
                    {this.renderFeedbackText()}
                    <button type='submit' className='submit'>{(this.props.usuario ? 'Editar ' : 'Agregar ') + 'Usuario'}</button>
                </form>
            </div>
        );
    },
    renderPassword: function () {
        if (this.props.usuario) {
            return;
        }

        return (
            <div className='input-wrapper'>
                <label>Contraseña Provisional</label>
                <input
                    type='password'
                    value={this.state.password}
                    className={classNames({invalid: this.state.invalidFields.password})}
                    onChange={this.handleChange.bind(this, 'password')} />
            </div>
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

        if (!this.props.usuario && (!state.password || !state.password.trim())) {
            state.invalidFields.password = true;
            invalidFields = true;
        }

        if (invalidFields) {
            this.setState(state);
            return;
        }

        var user = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            tipo: parseInt(this.state.tipo, 10),
            username: this.state.username,
            usuarioNuevo: this.state.usuarioNuevo
        };

        if (this.props.usuario) {
            user.id = this.props.usuario.id;
        } else {
            user.password = this.state.password;
        }

        UsuariosActions.saveUsuario(user);
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

module.exports = AltaUsuario;
