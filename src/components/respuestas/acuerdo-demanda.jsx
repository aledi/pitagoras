'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('src/utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Acuerdo Demanda Respuestas
// -----------------------------------------------------------------------------------------------

var AcuerdoDemanda = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Resultado del acuerdo: </span>
                    <span>{respuestas.resultadoAcuerdo}</span>
                </div>
                {this.renderDate(respuestas.fechaAcuerdo, 'Fecha de acuerdo')}
                {this.renderDate(respuestas.fechaPublicacion, 'Fecha de publicación')}
            </div>
        );
    },
    renderDate: function (date, text) {
        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>{text + ': '}</span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    }
});

module.exports = AcuerdoDemanda;
