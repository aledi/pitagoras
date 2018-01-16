'use strict';

var React = require('react');

var AccionRecord = require('src/records/accion');

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
        var hora = this.props.notificacion.hora;
        if (!hora) {
            return;
        }

        return (
            <span>
                <span> a las </span>
                <span className='bold'>{hora}</span>
            </span>
        );
    }
});

module.exports = NotificacionCinco;
