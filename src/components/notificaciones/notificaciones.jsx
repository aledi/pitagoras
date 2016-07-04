'use strict';

require('./notificaciones.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var NotificacionUno = require('src/components/notificaciones/notificacion-uno');
var NotificacionDos = require('src/components/notificaciones/notificacion-dos');
var NotificacionTres = require('src/components/notificaciones/notificacion-tres');
var NotificacionCuatro = require('src/components/notificaciones/notificacion-cuatro');

// -----------------------------------------------------------------------------------------------
// Notificaciones
// -----------------------------------------------------------------------------------------------

var Notificaciones = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    render: function () {
        return (
            <div className='notificaciones'>
                <h2>Notificaciones</h2>
                {this.renderNotificaciones()}
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
                {this.getNotificacionesItems()}
            </ul>
        );
    },
    getNotificacionesItems: function () {
        var notificaciones = [];
        var self = this;

        this.props.notificaciones.forEach(function (notificacion, index) {
            notificaciones.push(
                <li key={notificacion.numeroContrato + '-' + index} onClick={self.redirectToContrato.bind(self, notificacion.contratoId)}>
                    {self.renderNotificacionContent(notificacion)}
                </li>
            );
        });

        return notificaciones;
    },
    renderNotificacionContent: function (notificacion) {
        switch (notificacion.tipo) {
            case 1:
                return (<NotificacionUno notificacion={notificacion} />);
            case 2:
                return (<NotificacionDos notificacion={notificacion} />);
            case 3:
                return (<NotificacionTres notificacion={notificacion} />);
            case 4:
                return (<NotificacionCuatro notificacion={notificacion} />);
            default:
                break;
        }
    },
    redirectToContrato: function (contratoId) {

        this.context.router.push('/contratos/' + contratoId);
    }
});

module.exports = Notificaciones;
