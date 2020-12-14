'use strict';

require('./usuario-edit.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');

var UsuariosActions = require('../../actions/usuarios-actions');
var UsuariosStore = require('../../stores/usuarios-store');

// -----------------------------------------------------------------------------------------------
// UsuarioEdit
// -----------------------------------------------------------------------------------------------

var UsuarioEdit = React.createClass({
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
            invalidFields: {}
        };
    },
    componentDidMount: function () {
        this.storeListener = UsuariosStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.storeListener.remove();
    },
    onChange: function () {
        var saving = UsuariosStore.get('saving');
        var saveError = UsuariosStore.get('saveError');

        if (this.state.saving && !saving && !saveError) {
            this.setState({
                feedbackText: 'El usuario se ha creado exitosamente',
                nombre: '',
                apellido: '',
                email: '',
                tipo: 1,
                username: '',
                password: '',
                saving: false,
                saveError: false
            });

            return;
        }

        if (this.state.saving && !saving && saveError) {
            this.setState({
                feedbackText: 'Error al crear el usuario',
                saving: false,
                saveError: true
            });

            return;
        }

        this.setState({saving: saving});
    },
    render: function () {
        return (
            <div className='usuario-edit'>
                <form onSubmit={this.handleSubmit}>
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
                    <button type='submit' className='submit'>{(this.props.usuario ? 'Editar ' : 'Crear ') + 'Usuario'}</button>
                    {this.renderFeedbackText()}
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
        if (!feedbackText) {
            return;
        }

        return (
            <p className={classNames('feedback-text', {success: !this.state.saveError}, {error: this.state.saveError})}>
                {feedbackText}
            </p>
        );
    },
    handleChange: function (key, event) {
        var state = {invalidFields: this.state.invalidFields};
        state[key] = event.target.value;

        if (this.state.feedbackText) {
            state.feedbackText = null;
        }

        if (state.invalidFields[key]) {
            state.invalidFields[key] = false;
        }

        this.setState(state);
    },
    handleSubmit: function (event) {
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
    }
});

module.exports = UsuarioEdit;
