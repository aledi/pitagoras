'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Prevenida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaPrevenidaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'¿Desahogar?: ' + RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.desahogar)}</p>
            </div>
        );
    }
});

module.exports = DemandaPrevenidaRespuestas;
