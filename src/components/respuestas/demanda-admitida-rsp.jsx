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
            </div>
        );
    }
});

module.exports = DemandaAdmitidaRespuestas;
