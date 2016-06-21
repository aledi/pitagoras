'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Desechada Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaDesechadaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'Motivo: ' + this.props.accion.respuestas.tipoJuicio}</p>
                <p>{'¿Regresan documentos?: ' + RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.regresaDocumentos)}</p>
                <p>{'Horario: ' + this.props.accion.respuestas.horario}</p>
            </div>
        );
    }
});

module.exports = DemandaDesechadaRespuestas;
