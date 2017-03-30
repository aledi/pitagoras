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
                {this.renderNumeroFactura()}
                <div>
                    <span className='bold'>Local o Exhorto: </span>
                    <span>{respuestas.localExhorto}</span>
                </div>
                {this.renderDate(respuestas.fechaAcuerdo, 'Fecha de acuerdo')}
                {this.renderDate(respuestas.fechaPublicacion, 'Fecha de publicación')}
                {this.renderDisposicion()}
                {this.renderDiligenciable()}
            </div>
        );
    },
    renderNumeroFactura: function () {
        if (!this.props.accion.respuestas.numeroFactura) {
            return;
        }

        return (
            <div>
                <span className='bold'>Número de Factura: </span>
                <span>{this.props.accion.respuestas.numeroFactura}</span>
            </div>
        );
    },
    renderDisposicion: function () {
        if (this.props.accion.respuestas.localExhorto === 'Local') {
            return;
        }

        return (
            <div>
                <span className='bold'>Disposición: </span>
                <span>{this.props.accion.respuestas.disposicion}</span>
            </div>
        );
    },
    renderDiligenciable: function () {
        if (this.props.accion.respuestas.disposicion !== 'A disposición') {
            return;
        }

        return (
            <div>
                <span className='bold'>Diligenciable: </span>
                <span>{this.props.accion.respuestas.diligenciable}</span>
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
