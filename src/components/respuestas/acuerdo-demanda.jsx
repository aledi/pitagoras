'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('../../utils/date-utils');

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
                {this.renderLocalExhorto()}
                {this.renderTipoExhorto()}
                {this.renderTipoDisposicion()}
                {this.renderDate(respuestas.fechaAcuerdo, 'Fecha de acuerdo')}
                {this.renderDate(respuestas.fechaPublicacion, 'Fecha de publicación')}
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
    renderLocalExhorto: function () {
        if (this.props.accion.respuestas.resultadoAcuerdo !== 'Admite') {
            return;
        }

        return (
            <div>
                <span className='bold'>Local o Exhorto: </span>
                <span>{this.props.accion.respuestas.localExhorto}</span>
            </div>
        );
    },
    renderTipoExhorto: function () {
        if (this.props.accion.respuestas.localExhorto !== 'Exhorto') {
            return;
        }

        return (
            <div>
                <span className='bold'>Tipo de Exhorto: </span>
                <span>{this.props.accion.respuestas.tipoExhorto}</span>
            </div>
        );
    },
    renderTipoDisposicion: function () {
        if (this.props.accion.respuestas.tipoExhorto !== 'A disposición') {
            return;
        }

        return (
            <div>
                <span className='bold'>Tipo de Disposición: </span>
                <span>{this.props.accion.respuestas.tipoDisposicion}</span>
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
