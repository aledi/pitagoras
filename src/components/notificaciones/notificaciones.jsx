'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ChangePassword = require('src/components/auth/change-password');
var NotificacionUno = require('src/components/notificaciones/notificacion-uno');
var NotificacionDos = require('src/components/notificaciones/notificacion-dos');
var NotificacionTres = require('src/components/notificaciones/notificacion-tres');
var NotificacionCuatro = require('src/components/notificaciones/notificacion-cuatro');
var NotificacionCinco = require('src/components/notificaciones/notificacion-cinco');

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
                return (<NotificacionUno notificacion={notificacion} />);
            case 2:
                return (<NotificacionDos notificacion={notificacion} />);
            case 3:
                return (<NotificacionTres notificacion={notificacion} />);
            case 4:
                return (<NotificacionCuatro notificacion={notificacion} />);
            case 5:
                return (<NotificacionCinco notificacion={notificacion} />);
            default:
                break;
        }
    },
    togglePasswordForm: function () {
        this.setState({showingPasswordForm: !this.state.showingPasswordForm});
    },
    goToContrato: function (contratoId) {
        this.context.router.push('/contratos/' + contratoId);
    }
});

module.exports = Notificaciones;
