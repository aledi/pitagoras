'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Diligencia Embargo Respuestas
// -----------------------------------------------------------------------------------------------

var DiligenciaEmbargoRsp = React.createClass({
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
        if (!this.props.accion.respuestas.cita) {
            return;
        }

        return (
            <div>
                <div>
                    <span className='bold'>Fecha de cita: </span>
                    <span>{DateUtils.formatFechaRespuesta(this.props.accion.respuestas.cita.fecha)}</span>
                </div>
                <div>
                    <span className='bold'>Lugar de cita: </span>
                    <span>{this.props.accion.respuestas.cita.lugar}</span>
                </div>
                <div>
                    <span className='bold'>Nombre del actuario: </span>
                    <span>{this.props.accion.respuestas.cita.nombreActuario}</span>
                </div>
                <div>
                    <span className='bold'>Telefono del actuario: </span>
                    <span>{this.props.accion.respuestas.cita.telefonoActuario}</span>
                </div>
            </div>
        );
    }
});

module.exports = DiligenciaEmbargoRsp;
