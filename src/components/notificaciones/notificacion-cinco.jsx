'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

// -----------------------------------------------------------------------------------------------
// Notificacion Cinco
// -----------------------------------------------------------------------------------------------

var NotificacionCinco = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>La fecha de </span>
                <span className='bold'>{AccionRecord.ACCIONES_TYPES[notificacion.tipoAccion]}</span>
                <span> es el </span>
                <span className='bold'>{notificacion.formattedValues.fecha}</span>
                {this.renderHora()}
            </div>
        );
    },
    renderHora: function () {
        if (!this.props.notificacion.hora) {
            return;
        }

        return (
            <span>
                <span> a las </span>
                <span className='bold'>{this.props.notificacion.hora}</span>
            </span>
        );
    }
});

module.exports = NotificacionCinco;
