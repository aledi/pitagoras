'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Presentacion Demanda Respuestas
// -----------------------------------------------------------------------------------------------

var PresentacionDemandaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'Número de registro: ' + this.props.accion.respuestas.numeroRegistro}</p>
                <p>{'Juzgado: ' + this.props.accion.respuestas.juzgado}</p>
                <p>{'Fecha de presentación: ' + this.props.accion.respuestas.fechaPresentacion}</p>
            </div>
        );
    }
});

module.exports = PresentacionDemandaRespuestas;
