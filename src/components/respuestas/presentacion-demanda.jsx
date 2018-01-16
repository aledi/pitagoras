'use strict';

var React = require('react');

var DateUtils = require('src/utils/date-utils');
var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

var PresentacionDemanda = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Número de registro: </span>
                    <span>{respuestas.numeroRegistro}</span>
                </div>
                <div>
                    <span className='bold'>Juzgado: </span>
                    <span>{respuestas.juzgado}</span>
                </div>
                {this.renderDate()}
                <div>
                    <span className='bold'>Tipo de Juicio: </span>
                    <span>{respuestas.tipoJuicio}</span>
                </div>
                <div>
                    <span className='bold'>Pendiente: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(respuestas.pendiente)}</span>
                </div>
                {this.renderComentarioAcuerdoPendiente()}
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
                <span className='bold'>Fecha de presentación: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    },
    renderComentarioAcuerdoPendiente: function () {
        var respuestas = this.props.accion.respuestas;

        if (!respuestas.pendiente) {
            return;
        }

        return (
            <div>
                <span className='bold'>Comentarios de Acuerdo Pendiente: </span>
                <span>{respuestas.comentarioAcuerdoPendiente}</span>
            </div>
        );
    }
});

module.exports = PresentacionDemanda;
