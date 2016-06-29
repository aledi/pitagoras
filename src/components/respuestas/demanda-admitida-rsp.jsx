'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Demanda Admitida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaAdmitidaRsp = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Tipo de demanda: </span>
                    <span>{respuestas.tipoJuicio}</span>
                </div>
                <div>
                    <span className='bold'>Fecha: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Hora: </span>
                    <span>{respuestas.hora}</span>
                </div>
                <div>
                    <span className='bold'>Lugar: </span>
                    <span>{respuestas.lugar}</span>
                </div>
                {this.renderMoreRespuestas()}
            </div>
        );
    },
    renderMoreRespuestas: function () {
        var respuestas = this.props.accion.respuestas;

        if (respuestas.tipoJuicio === 'Oral Mercantil') {
            return (
                <div>
                    <span className='bold'>Resultado: </span>
                    <span>{respuestas.resultado}</span>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <span className='bold'>Fecha de cita: </span>
                    <span>{DateUtils.formatFechaRespuesta(respuestas.cita.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Lugar de cita: </span>
                    <span>{respuestas.cita.lugar}</span>
                </div>
                <div>
                    <span className='bold'>Nombre del actuario: </span>
                    <span>{respuestas.cita.nombreActuario}</span>
                </div>
                <div>
                    <span className='bold'>Teléfono del actuario: </span>
                    <span>{respuestas.cita.telefonoActuario}</span>
                </div>
            </div>
        );
    }
});

module.exports = DemandaAdmitidaRsp;
