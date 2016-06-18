'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Recoleccion Documentos Respuestas
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentosRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'¿Documentos recogidos?: ' + this.props.accion.respuestas.recogeDocumentos}</p>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentosRespuestas;
