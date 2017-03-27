'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Repo Respuestas
// -----------------------------------------------------------------------------------------------

var Repo = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Voluntario: </span>
                    <span>{respuestas.voluntario}</span>
                </div>
                <div>
                    <span className='bold'>Valor en Libros: </span>
                    <span>{respuestas.valorLibros}</span>
                </div>
                <div>
                    <span className='bold'>Personal: </span>
                    <span>{respuestas.personal}</span>
                </div>
            </div>
        );
    },
    renderDate: function (date, text) {
        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>{text + ': '}</span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    }
});

module.exports = Repo;
