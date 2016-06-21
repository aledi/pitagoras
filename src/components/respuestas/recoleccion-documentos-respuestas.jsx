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
                <p>{'¿Documentos recogidos?: ' + RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.recogeDocumentos)}</p>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentosRespuestas;
