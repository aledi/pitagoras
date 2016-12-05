'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');
var DateUtils = require('src/utils/date-utils');

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
                <div>
                    <span className='bold'>Nueva fecha: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Horario: </span>
                    <span>{respuestas.horario.start + ' - ' + respuestas.horario.end}</span>
                </div>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentos;
