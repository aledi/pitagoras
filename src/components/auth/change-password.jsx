'use strict';

require('./change-password.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

// -----------------------------------------------------------------------------------------------
// NotFound
// -----------------------------------------------------------------------------------------------

var ChangePassword = React.createClass({
    getInitialState: function () {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            invalidFields: {},
            submitting: false
        };
    },
    render: function () {
        return (
            <div className='change-password'>
                <span className='side-button' onClick={this.props.togglePasswordForm}>Regresar a inicio</span>
                {this.renderInitialMessage()}
                <form onSubmit={this.changePassword}>
                    <div className='input-wrapper'>
                        <label>Contraseña actual</label>
                        <input
                            type='password'
                            className={classNames({invalid: this.state.invalidFields.currentPassword})}
                            value={this.state.currentPassword}
                            onChange={this.handleChange.bind(this, 'currentPassword')}
                            disabled={this.state.submitting} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Nueva contraseña</label>
                        <input
                            type='password'
                            className={classNames({invalid: this.state.invalidFields.newPassword})}
                            value={this.state.newPassword}
                            onChange={this.handleChange.bind(this, 'newPassword')}
                            disabled={this.state.submitting} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Confirmar nueva contraseña</label>
                        <input
                            type='password'
                            className={classNames({invalid: this.state.invalidFields.confirmPassword})}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange.bind(this, 'confirmPassword')}
                            disabled={this.state.submitting} />
                    </div>
                    <p className={classNames('message', {error: this.state.error})}>{this.state.message}</p>
                    <button type='submit' className='submit' disabled={this.state.submitting}>Guardar</button>
                </form>
            </div>
        );
    },
    renderInitialMessage: function () {
        if (!this.props.newUser) {
            return;
        }

        return (
            <p className='initial-message'>
                Tu contraseña fue asignada por el administrador, por lo que se te sugiere cambiarla. Si no deseas hacerlo en este momento, podrás hacerlo después.
            </p>
        );
    },
    handleChange: function (key, event) {
        var state = {invalidFields: this.state.invalidFields};
        state[key] = event.target.value;
        state.invalidFields[key] = false;

        this.setState(state);
    },
    changePassword: function (event) {
        event.preventDefault();

        var newInvalidFields = this.state.invalidFields;
        var hasInvalidFields = false;

        if (!this.state.currentPassword || !this.state.currentPassword.trim()) {
            newInvalidFields.currentPassword = true;
            hasInvalidFields = true;
        }

        if (!this.state.newPassword || !this.state.newPassword.trim()) {
            newInvalidFields.newPassword = true;
            hasInvalidFields = true;
        }

        if (!this.state.confirmPassword || !this.state.confirmPassword.trim()) {
            newInvalidFields.confirmPassword = true;
            hasInvalidFields = true;
        }

        if (this.state.newPassword !== this.state.confirmPassword) {
            newInvalidFields.newPassword = true;
            newInvalidFields.confirmPassword = true;
            hasInvalidFields = true;
        }

        if (hasInvalidFields) {
            this.setState({invalidFields: newInvalidFields});
            return;
        }

        this.setState({submitting: true});

        Parse.User.current().setPassword(this.state.newPassword);

        if (this.props.newUser) {
            Parse.User.current().set('usuarioNuevo', false);
        }

        Parse.User.current().save().then(this.handleSuccess).catch(this.handleError);
    },
    handleSuccess: function (user) {
        this.setState({
            message: 'La contraseña se ha cambiado exitosamente.',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            submitting: false
        });
    },
    handleError: function (error) {
        this.setState({
            message: 'Error. Favor de intentar de nuevo.',
            error: error.message,
            submitting: false
        });
    }
});

module.exports = ChangePassword;
