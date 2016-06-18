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
                <p>{'Tipo de demanda: ' + this.props.accion.respuestas.tipoDemanda}</p>
                <p>{'Fecha: ' + this.props.accion.respuestas.fecha}</p>
                <p>{'Hora: ' + this.props.accion.respuestas.hora}</p>
                <p>{'Lugar: ' + this.props.accion.respuestas.lugar}</p>
            </div>
        );
    }
});

module.exports = DemandaAdmitidaRespuestas;
