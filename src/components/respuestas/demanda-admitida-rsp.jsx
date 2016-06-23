'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Demanda Admitida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaAdmitidaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Tipo de demanda: </span>
                    <span>{this.props.accion.respuestas.tipoDemanda}</span>
                </div>
                <div>
                    <span className='bold'>Fecha: </span>
                    <span>{this.props.accion.respuestas.fecha}</span>
                </div>
                <div>
                    <span className='bold'>Hora: </span>
                    <span>{this.props.accion.respuestas.hora}</span>
                </div>
                <div>
                    <span className='bold'>Lugar: </span>
                    <span>{this.props.accion.respuestas.lugar}</span>
                </div>
                {this.renderMoreRespuestas()}
            </div>
        );
    },
    renderMoreRespuestas: function () {
        if (this.props.accion.respuestas.tipoDemanda === 'Oral Mercantil') {
            return (
                <div>
                    <span className='bold'>Resultado: </span>
                    <span>{this.props.accion.respuestas.resultado}</span>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <span className='bold'>Fecha de cita: </span>
                    <span>{this.props.accion.respuestas.cita.fecha}</span>
                </div>
                <div>
                    <span className='bold'>Lugar: </span>
                    <span>{this.props.accion.respuestas.cita.lugar}</span>
                </div>
                <div>
                    <span className='bold'>Nombre del actuario: </span>
                    <span>{this.props.accion.respuestas.cita.nombreActuario}</span>
                </div>
                <div>
                    <span className='bold'>Teléfono del actuario: </span>
                    <span>{this.props.accion.respuestas.cita.telefonoActuario}</span>
                </div>
            </div>
        );
    }
});

module.exports = DemandaAdmitidaRespuestas;
