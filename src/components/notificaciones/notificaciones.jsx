'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AccionRecord = require('src/records/accion');

var ChangePassword = require('src/components/auth/change-password');

// -----------------------------------------------------------------------------------------------
// Notificaciones
// -----------------------------------------------------------------------------------------------

var Notificaciones = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {showingPasswordForm: this.props.newUser};
    },
    render: function () {
        return (
            <div className='notificaciones'>
                {this.renderContent()}
            </div>
        );
    },
    renderContent: function () {
        if (this.state.showingPasswordForm) {
            return (<ChangePassword newUser={this.props.newUser} togglePasswordForm={this.togglePasswordForm} />);
        }

        return (
            <div>
                <button className='side-button right' onClick={this.togglePasswordForm}>Cambiar contraseña</button>
                <div className='notifications-wrapper'>
                    <h4>Notificaciones</h4>
                    {this.renderNotificaciones()}
                </div>
            </div>
        );
    },
    renderNotificaciones: function () {
        if (!this.props.notificaciones) {
            return;
        }

        if (this.props.notificaciones.size === 0) {
            return (<div className='no-notificaciones'>Por el momento no tiene notificaciones.</div>);
        }

        return (
            <ul className='notificaciones-list'>
                {this.getNotificaciones()}
            </ul>
        );
    },
    getNotificaciones: function () {
        var notificaciones = [];
        var inactivity = [];
        var self = this;

        this.props.notificaciones.forEach(function (notificacion, index) {
            var item = (
                <li className='notificaciones-list-item' key={notificacion.numeroContrato + '-' + index}>
                    <Link to={'/contratos/' + notificacion.contratoId}>{'Contrato ' + notificacion.numeroContrato}</Link>
                    {self.renderNotificacionDetails(notificacion)}
                </li>
            );

            if (notificacion.tipo === 4) {
                inactivity.push(item);
            } else {
                notificaciones.push(item);
            }
        });

        return notificaciones.concat(inactivity);
    },
    renderNotificacionDetails: function (notificacion) {
        switch (notificacion.tipo) {
            case 1:
                return (<p>{'Require recoger documentos el día '}<b>{notificacion.formattedValues.fecha}</b>{' en un horario de '}<b>{notificacion.formattedValues.horario}</b></p>);
            case 2:
                return (<p>{'Requiere desahogo el día '}<b>{notificacion.formattedValues.fecha + '.'}</b></p>);
            case 3:
                return (<p>{'Cuenta con una cita el día '}<b>{notificacion.formattedValues.cita.fecha}</b>{' en'}<b>{notificacion.cita.lugar}</b>{' con el actuario '}<b>{notificacion.cita.nombreActuario}</b>{' con teléfono '}<b>{notificacion.cita.telefonoActuario}</b></p>);
            case 4:
                return (<p>{'No ha sido atendido desde el '}<b>{notificacion.formattedValues.fecha + '.'}</b></p>);
            case 5:
                return (<p>{'La fecha de '}<b>{AccionRecord.ACCIONES_TYPES[notificacion.tipoAccion]}</b>{' es el '}<b>{notificacion.formattedValues.fecha + (notificacion.hora ? '' : '.')}</b>{this.renderHoraNotification(notificacion)}</p>);
            default:
                break;
        }
    },
    renderHoraNotification: function (notificacion) {
        if (!notificacion.hora) {
            return;
        }

        return (<span>{' a las '}<b>{notificacion.hora + '.'}</b></span>);
    },
    togglePasswordForm: function () {
        this.setState({showingPasswordForm: !this.state.showingPasswordForm});
    },
    goToContrato: function (contratoId) {
        this.context.router.push('/contratos/' + contratoId);
    }
});

module.exports = Notificaciones;
