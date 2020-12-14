'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var DateUtils = require('../../utils/date-utils');

// -----------------------------------------------------------------------------------------------
// Repo Respuestas
// -----------------------------------------------------------------------------------------------

var Repo = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Voluntario: </span>
                    <span>{respuestas.voluntario}</span>
                </div>
                <div>
                    <span className='bold'>Valor en Libros: </span>
                    <span>{respuestas.valorLibros}</span>
                </div>
                <div>
                    <span className='bold'>Personal: </span>
                    <span>{respuestas.personal}</span>
                </div>
                {this.renderDate(respuestas.fechaVoBoRbu, 'Fecha VoBo RBU')}
                {this.renderDate(respuestas.fechaVoBoGmf, 'Fecha VoBo GMF')}
                {this.renderDate(respuestas.fecha, 'Fecha REPO')}
                <div>
                    <span className='bold'>Lugar Custodia: </span>
                    <span>{respuestas.lugarCustodia}</span>
                </div>
                {this.renderDate(respuestas.fechaSubasta1, 'Fecha Subasta 1')}
                {this.renderDate(respuestas.fechaSubasta2, 'Fecha Subasta 2')}
                {this.renderDate(respuestas.fechaSubasta3, 'Fecha Subasta 3')}
                {this.renderDate(respuestas.fechaSubasta4, 'Fecha Subasta 4')}
                {this.renderDate(respuestas.fechaSubasta5, 'Fecha Subasta 5')}
                <div>
                    <span className='bold'>Monto de Venta: </span>
                    <span>{respuestas.montoVenta}</span>
                </div>
                {this.renderDate(respuestas.fechaVenta, 'Fecha de Venta')}
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

module.exports = Repo;
