'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Visita Respuestas
// -----------------------------------------------------------------------------------------------

var VisitaRsp = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>¿Encontró el domicilio?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.domicilioUbicado)}</span>
                </div>
                <div>
                    <span className='bold'>¿Ubicó al cliente?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.clienteUbicado)}</span>
                </div>
                <div>
                    <span className='bold'>Datos de contacto: </span>
                    <span>{this.props.accion.respuestas.datosDeContacto}</span>
                </div>
            </div>
        );
    }
});

module.exports = VisitaRsp;
