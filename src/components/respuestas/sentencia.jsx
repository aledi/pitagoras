'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('../../utils/date-utils');

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
        var date = this.props.accion.respuestas.fecha;
        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    }
});

module.exports = Sentencia;
