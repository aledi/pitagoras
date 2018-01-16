'use strict';

var React = require('react');
var DateUtils = require('src/utils/date-utils');

var AmparoSentencia = React.createClass({
    render: function () {
        var juicioEjecutiva = !!this.props.accion.respuestas.favorable;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>{juicioEjecutiva ? 'Favorable a: ' : 'Promovido por: '}</span>
                    <span>{juicioEjecutiva ? this.props.accion.respuestas.favorable : this.props.accion.respuestas.promovido}</span>
                </div>
                {this.renderDate(juicioEjecutiva)}
            </div>
        );
    },
    renderDate: function (juicioEjecutiva) {
        var respuestas = this.props.accion.respuestas;
        if (!juicioEjecutiva || !respuestas.fecha) {
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

module.exports = AmparoSentencia;
