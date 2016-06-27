'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Presentacion Demanda Respuestas
// -----------------------------------------------------------------------------------------------

var PresentacionDemandaRsp = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Número de registro: </span>
                    <span>{respuestas.numeroRegistro}</span>
                </div>
                <div>
                    <span className='bold'>Juzgado: </span>
                    <span>{respuestas.juzgado}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de presentación: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Tipo de Juicio: </span>
                    <span>{respuestas.tipoJuicio}</span>
                </div>
            </div>
        );
    }
});

module.exports = PresentacionDemandaRsp;
