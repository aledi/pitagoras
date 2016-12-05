'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Alta Documentos Respuestas
// -----------------------------------------------------------------------------------------------

var AltaDocumentosRsp = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Número interno: </span>
                    <span>{respuestas.numeroInterno}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de recepción: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
            </div>
        );
    }
});

module.exports = AltaDocumentosRsp;
