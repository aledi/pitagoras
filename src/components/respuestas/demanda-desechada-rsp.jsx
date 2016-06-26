'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');
var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Desechada Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaDesechadaRsp = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Motivo: </span>
                    <span>{this.props.accion.respuestas.otroMotivo ? this.props.accion.respuestas.otroMotivo : this.props.accion.respuestas.motivo}</span>
                </div>
                <div>
                    <span className='bold'>¿Regresan documentos?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.regresaDocumentos)}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de regreso de documentos: </span>
                    <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Horario: </span>
                    <span>{this.props.accion.respuestas.horario}</span>
                </div>
            </div>
        );
    }
});

module.exports = DemandaDesechadaRsp;
