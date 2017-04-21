'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Extrajudicial Respuestas
// -----------------------------------------------------------------------------------------------

var Extrajudicial = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                {this.renderDate(this.props.accion.respuestas.fechaSeguimiento)}
            </div>
        );
    },
    renderDate: function (date, text) {
        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha de Seguimiento: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    }
});

module.exports = Extrajudicial;
