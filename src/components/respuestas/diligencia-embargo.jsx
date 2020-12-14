'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('../../utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Diligencia Embargo Respuestas
// -----------------------------------------------------------------------------------------------

var DiligenciaEmbargo = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Resultado: </span>
                    <span>{this.props.accion.respuestas.resultado}</span>
                </div>
                {this.renderCitaRespuestas()}
            </div>
        );
    },
    renderCitaRespuestas: function () {
        var respuestas = this.props.accion.respuestas;

        if (!respuestas.cita) {
            return;
        }

        return (
            <div>
                {this.renderDate()}
                {this.renderHour()}
                <div>
                    <span className='bold'>Lugar de cita: </span>
                    <span>{respuestas.cita.lugar}</span>
                </div>
                <div>
                    <span className='bold'>Nombre del actuario: </span>
                    <span>{respuestas.cita.nombreActuario}</span>
                </div>
                <div>
                    <span className='bold'>Telefono del actuario: </span>
                    <span>{respuestas.cita.telefonoActuario}</span>
                </div>
            </div>
        );
    },
    renderDate: function () {
        var date = this.props.accion.respuestas.cita.fecha;

        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha de cita: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    },
    renderHour: function () {
        var hour = this.props.accion.respuestas.cita.hora;

        if (!hour) {
            return;
        }

        return (
            <div>
                <span className='bold'>Hora de cita: </span>
                <span>{hour}</span>
            </div>
        );
    }
});

module.exports = DiligenciaEmbargo;
