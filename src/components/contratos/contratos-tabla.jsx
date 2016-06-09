'use strict';

require('./contratos-tabla.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// ContratosTabla
// -----------------------------------------------------------------------------------------------

var ContratosTabla = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    render: function () {
        return (
            <div className='contratos-table-wrapper'>
                <table>
                    <tbody>
                        <tr>
                            <th>Número de Contrato</th>
                            <th>Nombre de Cliente</th>
                            <th>Modelo Vehículo</th>
                            <th>Marca</th>
                            <th>Año</th>
                            <th>Distribuidor</th>
                            <th>Monto</th>
                            <th>Plazo</th>
                            <th>Tasa</th>
                        </tr>
                        {this.renderContratos()}
                    </tbody>
                </table>
            </div>
        );
    },
    renderContratos: function () {
        if (!this.props.contratos) {
            return;
        }

        var self = this;
        var contratos = [];

        this.props.contratos.forEach(function (contrato) {
            contratos.push(
                <tr className='content-row' onClick={self.handleContratoClick.bind(self, contrato.id)} key={contrato.id}>
                    <td>{contrato.numeroContrato}</td>
                    <td>{contrato.cliente.formattedValues.nombre}</td>
                    <td>{contrato.vehiculo.modelo}</td>
                    <td>{contrato.vehiculo.marca}</td>
                    <td>{contrato.vehiculo.anio}</td>
                    <td>{contrato.vehiculo.distribuidor}</td>
                    <td>{contrato.formattedValues.monto}</td>
                    <td>{contrato.plazo}</td>
                    <td>{contrato.formattedValues.tasa}</td>
                </tr>
            );
        });

        return contratos;
    },
    handleContratoClick: function (id) {
        this.context.router.push('/contratos/' + id);
    }
});

module.exports = ContratosTabla;
