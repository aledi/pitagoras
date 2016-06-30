'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var NotificacionUno = require('src/components/notificaciones/notificacion-uno');
var NotificacionDos = require('src/components/notificaciones/notificacion-dos');
var NotificacionTres = require('src/components/notificaciones/notificacion-tres');

// -----------------------------------------------------------------------------------------------
// Notificaciones
// -----------------------------------------------------------------------------------------------

var Notificaciones = React.createClass({
    render: function () {
        return (
            <div className='notificaciones'>
                <ul>
                    {this.getNotificacionesItems()}
                </ul>
            </div>
        );
    },
    getNotificacionesItems: function () {
        if (!this.props.notificaciones) {
            return;
        }

        var notificaciones = [];
        var self = this;

        this.props.notificaciones.forEach(function (notificacion, index) {
            notificaciones.push(
                <li key={notificacion.numeroContrato + '-' + index}>
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
            default:
                break;
        }
    }
});

module.exports = Notificaciones;
