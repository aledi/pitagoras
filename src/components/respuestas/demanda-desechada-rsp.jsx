'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Desechada Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaDesechadaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Motivo: </span>
                    <span>{this.props.accion.respuestas.motivo}</span>
                </div>
                <div>
                    <span className='bold'>¿Regresan documentos?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.regresaDocumentos)}</span>
                </div>
                <div>
                    <span className='bold'>Horario: </span>
                    <span>{this.props.accion.respuestas.horario}</span>
                </div>
            </div>
        );
    }
});

module.exports = DemandaDesechadaRespuestas;
