'use strict';

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');
var DateUtils = require('src/utils/date-utils');

var DemandaDesechada = React.createClass({
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
                {this.renderDate()}
                {this.renderHours()}
            </div>
        );
    },
    renderDate: function () {
        var respuestas = this.props.accion.respuestas;
        if (!respuestas.regresaDocumentos) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha de regreso de documentos: </span>
                <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
            </div>
        );
    },
    renderHours: function () {
        var respuestas = this.props.accion.respuestas;

        if (!respuestas.regresaDocumentos || !respuestas.horario || (respuestas.horario && (respuestas.horario.start == null || respuestas.horario.end == null))) {
            return;
        }

        return (
            <div>
                <span className='bold'>Horario: </span>
                <span>{respuestas.horario.start + ' - ' + respuestas.horario.end}</span>
            </div>
        );
    }
});

module.exports = DemandaDesechada;
