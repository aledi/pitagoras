'use strict';

require('./user-edit.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');

var UsersActions = require('src/actions/users-actions');
var UsersStore = require('src/stores/users-store');

// -----------------------------------------------------------------------------------------------
// UserEdit
// -----------------------------------------------------------------------------------------------

var UserEdit = React.createClass({
    getInitialState: function () {
        var user = this.props.user || {};

        return {
            name: user.nombre || '',
            lastName: user.apellido || '',
            email: user.email || '',
            type: user.tipo || 1,
            username: user.username || '',
            password: '',
            newUser: this.props.user ? user.usuarioNuevo : true,
            invalidFields: {}
        };
    },
    componentDidMount: function () {
        this.storeListener = UsersStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.storeListener.remove();
    },
    onChange: function () {
        var saving = UsersStore.get('saving');
        var saveError = UsersStore.get('saveError');

        if (this.state.saving && !saving && !saveError) {
            this.setState({
                feedbackText: 'El usuario se ha creado exitosamente',
                name: '',
                lastName: '',
                email: '',
                type: 1,
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
            <div className='user-edit'>
                <form onSubmit={this.handleSubmit}>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input
                            type='text'
                            value={this.state.name}
                            className={classNames({invalid: this.state.invalidFields.name})}
                            onChange={this.handleChange.bind(this, 'name')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellidos</label>
                        <input
                            type='text'
                            value={this.state.lastName}
                            className={classNames({invalid: this.state.invalidFields.lastName})}
                            onChange={this.handleChange.bind(this, 'lastName')} />
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
                        <select value={this.state.type} onChange={this.handleChange.bind(this, 'type')}>
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
                    <button type='submit' className='submit'>{(this.props.user ? 'Editar ' : 'Crear ') + 'Usuario'}</button>
                    {this.renderFeedbackText()}
                </form>
            </div>
        );
    },
    renderPassword: function () {
        if (this.props.user) {
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

        if (!state.name || !state.name.trim()) {
            state.invalidFields.name = true;
            invalidFields = true;
        }

        if (!state.lastName || !state.lastName.trim()) {
            state.invalidFields.lastName = true;
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

        if (!this.props.user && (!state.password || !state.password.trim())) {
            state.invalidFields.password = true;
            invalidFields = true;
        }

        if (invalidFields) {
            this.setState(state);
            return;
        }

        var user = {
            nombre: this.state.name,
            apellido: this.state.lastName,
            email: this.state.email,
            tipo: parseInt(this.state.type, 10),
            username: this.state.username,
            usuarioNuevo: this.state.newUser
        };

        if (this.props.user) {
            user.id = this.props.user.id;
        } else {
            user.password = this.state.password;
        }

        UsersActions.saveUser(user);
    }
});

module.exports = UserEdit;
