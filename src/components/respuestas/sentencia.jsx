'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Sentencia
// -----------------------------------------------------------------------------------------------

var Sentencia = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Favorable a: </span>
                    <span>{this.props.accion.respuestas.favorable}</span>
                </div>
                {this.renderDate()}
            </div>
        );
    },
    renderDate: function () {
        var respuestas = this.props.accion.respuestas;
        if (!respuestas.fecha) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha: </span>
                <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
            </div>
        );
    }
});

module.exports = Sentencia;
