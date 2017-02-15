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
// Notifications
// -----------------------------------------------------------------------------------------------

var Notifications = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {showingPasswordForm: this.props.newUser};
    },
    render: function () {
        return (
            <div className='notifications'>
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
                    {this.renderNotifications()}
                </div>
            </div>
        );
    },
    renderNotifications: function () {
        if (!this.props.notifications) {
            return;
        }

        if (this.props.notifications.size === 0) {
            return (<div className='no-notifications'>Por el momento no tiene notificaciones.</div>);
        }

        return (
            <ul className='notifications-list'>
                {this.getNotifications()}
            </ul>
        );
    },
    getNotifications: function () {
        var notifications = [];
        var inactivity = [];
        var self = this;

        this.props.notifications.forEach(function (notification, index) {
            var item = (
                <li className='notifications-list-item' key={notification.numeroContrato + '-' + index}>
                    <Link to={'/contratos/' + notification.contratoId}>{'Contrato ' + notification.numeroContrato}</Link>
                    {self.renderNotificationDetails(notification)}
                </li>
            );

            if (notification.tipo === 4) {
                inactivity.push(item);
            } else {
                notifications.push(item);
            }
        });

        return notifications.concat(inactivity);
    },
    renderNotificationDetails: function (notification) {
        switch (notification.tipo) {
            case 1:
                return (<p>{'Require recoger documentos el día '}<b>{notification.formattedValues.fecha}</b>{' en un horario de '}<b>{notification.formattedValues.horario}</b></p>);
            case 2:
                return (<p>{'Requiere desahogo el día '}<b>{notification.formattedValues.fecha + '.'}</b></p>);
            case 3:
                return (<p>{'Cuenta con una cita el día '}<b>{notification.formattedValues.cita.fecha}</b>{' en'}<b>{notification.cita.lugar}</b>{' con el actuario '}<b>{notification.cita.nombreActuario}</b>{' con teléfono '}<b>{notification.cita.telefonoActuario}</b></p>);
            case 4:
                return (<p>{'No ha sido atendido desde el '}<b>{notification.formattedValues.fecha + '.'}</b></p>);
            case 5:
                return (<p>{'La fecha de '}<b>{AccionRecord.ACCIONES_TYPES[notification.tipoAccion]}</b>{' es el '}<b>{notification.formattedValues.fecha + (notification.hora ? '' : '.')}</b>{this.renderHoraNotification(notification)}</p>);
            default:
                break;
        }
    },
    renderHoraNotification: function (notification) {
        if (!notification.hora) {
            return;
        }

        return (<span>{' a las '}<b>{notification.hora + '.'}</b></span>);
    },
    togglePasswordForm: function () {
        this.setState({showingPasswordForm: !this.state.showingPasswordForm});
    }
});

module.exports = Notifications;
