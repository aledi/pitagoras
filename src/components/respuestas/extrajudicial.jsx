'use strict';

var React = require('react');

var DateUtils = require('src/utils/date-utils');

var Extrajudicial = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Resultado de Gestión: </span>
                    <span>{respuestas.resultadoGestion}</span>
                </div>
                <div>
                    <span className='bold'>Modo de Contacto: </span>
                    <span>{respuestas.modoContacto}</span>
                </div>
                <div>
                    <span className='bold'>Persona Contactada: </span>
                    <span>{respuestas.personaContactada}</span>
                </div>
                <div>
                    <span className='bold'>Lugar de Contacto: </span>
                    <span>{respuestas.lugarContacto}</span>
                </div>
                <div>
                    <span className='bold'>Monto Promesado: </span>
                    <span>{respuestas.montoPromesado}</span>
                </div>
                {this.renderDate(respuestas.fechaSeguimiento)}
                {this.renderHour(respuestas.horaSeguimiento)}
                <div>
                    <span className='bold'>Recordatorio: </span>
                    <span>{respuestas.recordatorio}</span>
                </div>
            </div>
        );
    },
    renderDate: function (date) {
        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha de Seguimiento: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    },
    renderHour: function (hour) {
        if (!hour) {
            return;
        }

        return (
            <div>
                <span className='bold'>Hora de Seguimiento: </span>
                <span>{hour}</span>
            </div>
        );
    }
});

module.exports = Extrajudicial;
