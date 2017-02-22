'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// SentenciaApelacion
// -----------------------------------------------------------------------------------------------

var SentenciaApelacion = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Favorable a: </span>
                    <span>{respuestas.favorable}</span>
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

module.exports = SentenciaApelacion;
