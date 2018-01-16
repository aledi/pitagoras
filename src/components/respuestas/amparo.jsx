'use strict';

var React = require('react');

var DateUtils = require('src/utils/date-utils');

var Amparo = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                {this.renderDate(respuestas.fechaPresentacion, 'Fecha de presentación')}
                <div>
                    <span className='bold'>Expediente: </span>
                    <span>{respuestas.expediente}</span>
                </div>
                <div>
                    <span className='bold'>Juzgado: </span>
                    <span>{respuestas.juzgado}</span>
                </div>
                <div>
                    <span className='bold'>Resolución: </span>
                    <span>{respuestas.resolucion}</span>
                </div>
                {this.renderDate(respuestas.fechaResolucion, 'Fecha de resolución')}
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

module.exports = Amparo;
