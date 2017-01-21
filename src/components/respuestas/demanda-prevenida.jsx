'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');
var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Prevenida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaPrevenida = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>¿Desahogar?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.desahogar)}</span>
                </div>
                {this.renderFecha()}
            </div>
        );
    },
    renderFecha: function () {
        if (!this.props.accion.respuestas.desahogar) {
            return;
        }

        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Desahogar el: </span>
                <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.fecha)}</span>
            </div>
        );
    }
});

module.exports = DemandaPrevenida;
