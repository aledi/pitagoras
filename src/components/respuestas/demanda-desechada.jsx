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
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Motivo: </span>
                    <span>{respuestas.otroMotivo ? respuestas.otroMotivo : respuestas.motivo}</span>
                </div>
                <div>
                    <span className='bold'>¿Regresan documentos?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(respuestas.regresaDocumentos)}</span>
                </div>
                {this.renderFechaHorario()}
            </div>
        );
    },
    renderFechaHorario: function () {
        var respuestas = this.props.accion.respuestas;
        if (!respuestas.regresaDocumentos) {
            return;
        }

        return [
            <div key='fecha'>
                <span className='bold'>Fecha de regreso de documentos: </span>
                <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
            </div>,
            <div key='horario'>
                <span className='bold'>Horario: </span>
                <span>{respuestas.horario.start + ' - ' + respuestas.horario.end}</span>
            </div>
        ];
    }
});

module.exports = DemandaDesechadaRsp;
