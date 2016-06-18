'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Visita Respuestas
// -----------------------------------------------------------------------------------------------

var VisitaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'¿Encontró el domicilio?: ' + this.props.accion.respuestas.domicilioUbicado}</p>
                <p>{'¿Ubicó al cliente?: ' + this.props.accion.respuestas.clienteUbicado}</p>
                <p>{'Datos de contacto: ' + this.props.accion.respuestas.datosDeContacto}</p>
            </div>
        );
    }
});

module.exports = VisitaRespuestas;
