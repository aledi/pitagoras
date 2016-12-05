'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Amparo Respuestas
// -----------------------------------------------------------------------------------------------

var AmparoRsp = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Fecha de presentación: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fechaPresentacion)}</span>
                </div>
                <div>
                    <span className='bold'>Expediente: </span>
                    <span>{respuestas.expediente}</span>
                </div>
                <div>
                    <span className='bold'>Juzgado: </span>
                    <span>{respuestas.juzgado}</span>
                </div>
                <div>
                    <span className='bold'>Resolución: </span>
                    <span>{respuestas.resolucion}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de resolución: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fechaResolucion)}</span>
                </div>
            </div>
        );
    }
});

module.exports = AmparoRsp;
