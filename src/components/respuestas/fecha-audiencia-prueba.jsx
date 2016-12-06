'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Fecha Audiencia Prueba Respuestas
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPrueba = React.createClass({
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
            </div>
        );
    }
});

module.exports = FechaAudienciaPrueba;
