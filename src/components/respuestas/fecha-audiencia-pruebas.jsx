'use strict';

var React = require('react');

var DateUtils = require('src/utils/date-utils');
var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

var FechaAudienciaPruebas = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Atendido por: </span>
                    <span>{respuestas.atendido}</span>
                </div>
                {this.renderDate()}
                {this.renderHour()}
                <div>
                    <span className='bold'>Citación a Sentencia: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.citacion)}</span>
                </div>
                {this.renderExtraDate(1)}
                {this.renderExtraDate(2)}
                {this.renderExtraDate(3)}
            </div>
        );
    },
    renderDate: function () {
        var fecha = this.props.accion.respuestas.fecha;
        if (!fecha) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha: </span>
                <span>{DateUtils.formatFechaRespuesta(fecha)}</span>
            </div>
        );
    },
    renderHour: function () {
        var hour = this.props.accion.respuestas.hora;
        if (!hour) {
            return;
        }

        return (
            <div>
                <span className='bold'>Hora: </span>
                <span>{hour}</span>
            </div>
        );
    },
    renderExtraDate: function (num) {
        var respuestas = this.props.accion.respuestas;
        if (!respuestas['fecha' + num]) {
            return;
        }

        return (
            <div>
                <div>
                    <span className='bold'>{'Fecha ' + num + ': '}</span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas['fecha' + num])}</span>
                </div>
                <div>
                    <span className='bold'>{'Hora ' + num + ': '}</span>
                    <span>{respuestas['hora' + num]}</span>
                </div>
            </div>
        );
    }
});

module.exports = FechaAudienciaPruebas;
