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
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Número interno: </span>
                    <span>{this.props.accion.respuestas.numeroInterno}</span>
                </div>
                <div>
                    <span className='bold'>Fecha de recepción: </span>
                    <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.fecha)}</span>
                </div>
            </div>
        );
    }
});

module.exports = AltaDocumentosRsp;
