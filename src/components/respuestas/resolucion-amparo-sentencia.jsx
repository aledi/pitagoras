'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Resolución Amparo vs Sentencia
// -----------------------------------------------------------------------------------------------

var ResolucionAmparoSentencia = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Fecha: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Favorable a: </span>
                    <span>{respuestas.favorable}</span>
                </div>
            </div>
        );
    }
});

module.exports = ResolucionAmparoSentencia;
