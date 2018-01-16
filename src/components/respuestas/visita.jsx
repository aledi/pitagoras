'use strict';

var React = require('react');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

var Visita = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>¿Encontró el domicilio?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(respuestas.domicilioUbicado)}</span>
                </div>
                <div>
                    <span className='bold'>¿Ubicó al cliente?: </span>
                    <span>{RespuestasUtils.formatBooleanRespuesta(respuestas.clienteUbicado)}</span>
                </div>
                <div>
                    <span className='bold'>Datos de contacto: </span>
                    <span>{respuestas.datosDeContacto}</span>
                </div>
            </div>
        );
    }
});

module.exports = Visita;
