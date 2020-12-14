'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('../../utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Fecha Sentencia Respuestas
// -----------------------------------------------------------------------------------------------

var FechaSentencia = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Atendido por: </span>
                    <span>{respuestas.atendido}</span>
                </div>
                {this.renderDate()}
                {this.renderHour()}
            </div>
        );
    },
    renderDate: function () {
        var date = this.props.accion.respuestas.fecha;

        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    },
    renderHour: function () {
        var hora = this.props.accion.respuestas.hora;
        if (!hora) {
            return;
        }

        return (
            <div>
                <span className='bold'>Hora: </span>
                <span>{hora}</span>
            </div>
        );
    }
});

module.exports = FechaSentencia;
