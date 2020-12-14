'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('./respuestas-utils');
var DateUtils = require('../../utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Recoleccion Documentos Respuestas
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentos = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>¿Documentos recogidos?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.recogeDocumentos)}</span>
                </div>
                {this.renderMoreRespuestas()}
            </div>
        );
    },
    renderMoreRespuestas: function () {
        var respuestas = this.props.accion.respuestas;

        if (respuestas.recogeDocumentos) {
            return (
                <div>
                    <div>
                        <span className='bold'>¿Quién recogió?: </span>
                        <span>{respuestas.personaRecoge}</span>
                    </div>
                    <div>
                        <span className='bold'>¿Qué recogió?: </span>
                        <span>{respuestas.documentosRecogidos}</span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {this.renderDate()}
                {this.renderHours()}
            </div>
        );
    },
    renderDate: function () {
        var fecha = this.props.accion.respuestas.fecha;
        if (!fecha) {
            return;
        }

        return (
            <div>
                <span className='bold'>Nueva fecha: </span>
                <span>{DateUtils.formatFechaRespuesta(fecha)}</span>
            </div>
        );
    },
    renderHours: function () {
        var respuestas = this.props.accion.respuestas;

        if (!respuestas.fecha || !respuestas.horario || respuestas.horario.start == null || respuestas.horario.end == null) {
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

module.exports = RecoleccionDocumentos;
