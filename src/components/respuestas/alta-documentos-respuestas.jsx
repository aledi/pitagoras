'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Alta Documentos Respuestas
// -----------------------------------------------------------------------------------------------

var AltaDocumentosRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'Número interno: ' + this.props.accion.respuestas.numeroInterno}</p>
                <p>{'Fecha de recepción: ' + this.props.accion.respuestas.fechaRecepcion}</p>
            </div>
        );
    }
});

module.exports = AltaDocumentosRespuestas;
