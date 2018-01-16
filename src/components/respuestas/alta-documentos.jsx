'use strict';

var React = require('react');

var DateUtils = require('src/utils/date-utils');

var AltaDocumentos = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Número interno: </span>
                    <span>{respuestas.numeroInterno}</span>
                </div>
                {this.renderDate()}
            </div>
        );
    },
    renderDate: function () {
        var date = this.props.accion.respuestas.fecha;

        if (!date) {
            return;
        }

        return (
            <div>
                <span className='bold'>Fecha de recepción: </span>
                <span>{DateUtils.formatFechaRespuesta(date)}</span>
            </div>
        );
    }
});

module.exports = AltaDocumentos;
