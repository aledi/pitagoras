'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Desahogo Respuestas
// -----------------------------------------------------------------------------------------------

var DesahogoRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'¿Desahogar?: ' + RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.desahogar)}</p>
            </div>
        );
    }
});

module.exports = DesahogoRespuestas;
