'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');
var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Fecha Audiencia Pruebas Respuestas
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPruebas = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Atraído por: </span>
                    <span>{respuestas.atraido}</span>
                </div>
                <div>
                    <span className='bold'>Fecha: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Hora: </span>
                    <span>{respuestas.hora}</span>
                </div>
                <div>
                    <span className='bold'>Citación a Sentencia: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.citacion)}</span>
                </div>
                {this.renderFecha(1)}
                {this.renderFecha(2)}
                {this.renderFecha(3)}
            </div>
        );
    },
    renderFecha: function (num) {
        var respuestas = this.props.accion.respuestas;
        if (!respuestas['fecha' + num]) {
            return;
        }

        return (
            <div>
                <div>
                    <span className='bold'>{'Fecha ' + num + ': '}</span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas['fecha' + num])}</span>
                </div>
                <div>
                    <span className='bold'>{'Hora ' + num + ': '}</span>
                    <span>{respuestas['hora' + num]}</span>
                </div>
            </div>
        );
    }
});

module.exports = FechaAudienciaPruebas;
