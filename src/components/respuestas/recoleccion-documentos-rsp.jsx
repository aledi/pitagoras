'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Recoleccion Documentos Respuestas
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentosRespuestas = React.createClass({
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
        if (this.props.accion.respuestas.recogeDocumentos) {
            return (
                <div>
                    <div>
                        <span className='bold'>¿Quién recogió?: </span>
                        <span>{this.props.accion.respuestas.personaRecoge}</span>
                    </div>
                    <div>
                        <span className='bold'>¿Qué recogió?: </span>
                        <span>{this.props.accion.respuestas.documentosRecogidos}</span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <span className='bold'>Nueva fecha: </span>
                    <span>{this.props.accion.respuestas.nuevaFecha}</span>
                </div>
                <div>
                    <span className='bold'>Hora: </span>
                    <span>{this.props.accion.respuestas.hora}</span>
                </div>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentosRespuestas;
