'use strict';

require('./contratos-tabla.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');

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
                            <th onClick={this.sortByColumn.bind(this, 'numeroContrato')}>Número de Contrato</th>
                            <th onClick={this.sortByColumn.bind(this, 'cliente')}>Nombre de Cliente</th>
                            <th onClick={this.sortByColumn.bind(this, 'modelo')}>Modelo Vehículo</th>
                            <th onClick={this.sortByColumn.bind(this, 'marca')}>Marca</th>
                            <th onClick={this.sortByColumn.bind(this, 'anio')}>Año</th>
                            <th onClick={this.sortByColumn.bind(this, 'distribuidor')}>Distribuidor</th>
                            <th onClick={this.sortByColumn.bind(this, 'monto')}>Monto</th>
                            <th onClick={this.sortByColumn.bind(this, 'plazo')}>Plazo</th>
                            <th onClick={this.sortByColumn.bind(this, 'tasa')}>Tasa</th>
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
    sortByColumn: function (column) {
        ContratosActions.sortContratos(column);
    },
    handleContratoClick: function (id) {
        this.context.router.push('/contratos/' + id);
    }
});

module.exports = ContratosTabla;
