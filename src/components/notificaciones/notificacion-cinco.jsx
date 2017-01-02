'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Cinco
// -----------------------------------------------------------------------------------------------

var NotificacionCinco = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>La fecha de </span>
                <span className='bold'>{notificacion.formattedValues.cita.fecha}</span>
                <span> es el </span>
                <span className='bold'>{notificacion.cita.lugar}</span>
                {this.renderHora()}
            </div>
        );
    },
    renderHora: function () {
        if (!this.props.notificacion.hora) {
            return;
        }

        return (
            <span> a las </span>
            <span className='bold'>{notificacion.cita.nombreActuario}</span>
        );
    }
});

module.exports = NotificacionCinco;
