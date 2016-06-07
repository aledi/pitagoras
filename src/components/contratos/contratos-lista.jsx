'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// ContratosLista
// -----------------------------------------------------------------------------------------------

var ContratosLista = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    render: function () {
        return (
            <div className='list-contratos'>
                <table className='table-contratos'>
                    <tbody>
                        <tr>
                            <th className='table-header'>Número de Contrato</th>
                            <th className='table-header'>Nombre de Cliente</th>
                            <th className='table-header'>Modelo Vehículo</th>
                            <th className='table-header'>Marca</th>
                            <th className='table-header'>Año</th>
                            <th className='table-header'>Distribuidor</th>
                            <th className='table-header'>Monto</th>
                            <th className='table-header'>Plazo</th>
                            <th className='table-header'>Tasa</th>
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
                <tr className='table-row' onClick={self.handleContratoClick.bind(self, contrato.id)} key={contrato.id}>
                    <td className='table-column'>{contrato.numeroContrato}</td>
                    <td className='table-column'>{contrato.cliente.nombre + ' ' + contrato.cliente.apellidoPaterno + ' ' + contrato.cliente.apellidoMaterno}</td>
                    <td className='table-column'>{contrato.vehiculo.modelo}</td>
                    <td className='table-column'>{contrato.vehiculo.marca}</td>
                    <td className='table-column'>{contrato.vehiculo.anio}</td>
                    <td className='table-column'>{contrato.vehiculo.distribuidor}</td>
                    <td className='table-column'>{'$' + contrato.monto}</td>
                    <td className='table-column'>{contrato.plazo}</td>
                    <td className='table-column'>{contrato.tasa + '%'}</td>
                </tr>
            );
        });

        return contratos;
    },
    handleContratoClick: function (id) {
        this.context.router.push('/contratos/' + id);
    }
});

module.exports = ContratosLista;
