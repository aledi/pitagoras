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
                            <th onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>Número de Contrato</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'juzgado')}>Juzgado</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'cliente')}>Nombre de Cliente</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'modelo')}>Modelo Vehículo</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'marca')}>Marca</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'anio')}>Año</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'distribuidor')}>Distribuidor</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'monto')}>Monto</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'plazo')}>Plazo</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'tasa')}>Tasa</th>
                            <th onClick={ContratosActions.sortContratos.bind(this, 'especial')}>Especial</th>
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
                    <td>{contrato.juzgado}</td>
                    <td>{contrato.cliente.formattedValues.nombre}</td>
                    <td>{contrato.vehiculo.modelo}</td>
                    <td>{contrato.vehiculo.marca}</td>
                    <td>{contrato.vehiculo.anio}</td>
                    <td>{contrato.vehiculo.distribuidor}</td>
                    <td>{contrato.formattedValues.monto}</td>
                    <td>{contrato.plazo}</td>
                    <td>{contrato.formattedValues.tasa}</td>
                    <td>{contrato.formattedValues.especial}</td>
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
