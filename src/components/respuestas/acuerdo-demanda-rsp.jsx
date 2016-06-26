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
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Resultado del acuerdo: </span>
                    <span>{this.props.accion.respuestas.resultadoAcuerdo}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de acuerdo: </span>
                    <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.fechaAcuerdo)}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de publicación: </span>
                    <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.fechaPublicacion)}</span>
                </div>
            </div>
        );
    }
});

module.exports = AcuerdoDemandaRsp;
