'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

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

        this.props.notificaciones.forEach(function (notificacion, index) {
            notificaciones.push(
                <li key={notificacion.numeroContrato + '-' + index}>
                    {notificacion.numeroContrato}
                    {notificacion.formattedValues.fecha}
                </li>
            );
        });

        return notificaciones;
    }
});

module.exports = Notificaciones;
