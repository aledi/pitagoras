'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Acuerdo Demanda Respuestas
// -----------------------------------------------------------------------------------------------

var AcuerdoDemandaRsp = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Resultado del acuerdo: </span>
                    <span>{respuestas.resultadoAcuerdo}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de acuerdo: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fechaAcuerdo)}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de publicación: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fechaPublicacion)}</span>
                </div>
            </div>
        );
    }
});

module.exports = AcuerdoDemandaRsp;
