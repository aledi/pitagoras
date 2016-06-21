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
                <span className='bold'>¿Documentos recogidos?: </span>
                <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.recogeDocumentos)}</span>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentosRespuestas;
