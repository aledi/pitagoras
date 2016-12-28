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
                <div>
                    <span className='bold'>Fecha 1: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha1)}</span>
                </div>
                <div>
                    <span className='bold'>Hora 1: </span>
                    <span>{respuestas.hora1}</span>
                </div>
                <div>
                    <span className='bold'>Fecha 2: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha2)}</span>
                </div>
                <div>
                    <span className='bold'>Hora 2: </span>
                    <span>{respuestas.hora2}</span>
                </div>
                <div>
                    <span className='bold'>Fecha 3: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha3)}</span>
                </div>
                <div>
                    <span className='bold'>Hora 3: </span>
                    <span>{respuestas.hora3}</span>
                </div>
            </div>
        );
    }
});

module.exports = FechaAudienciaPruebas;
