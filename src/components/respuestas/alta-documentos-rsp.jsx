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
                <div>
                    <span className='bold'>Número interno: </span>
                    <span>{this.props.accion.respuestas.numeroInterno}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de recepción: </span>
                    <span>{this.props.accion.respuestas.fechaRecepcion}</span>
                </div>
            </div>
        );
    }
});

module.exports = AltaDocumentosRespuestas;
