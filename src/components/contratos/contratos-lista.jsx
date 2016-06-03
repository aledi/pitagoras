'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// ContratosLista
// -----------------------------------------------------------------------------------------------

var ContratosLista = React.createClass({
    render: function () {
        return (
            <main className='contratos-lista'>
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
            </main>
        );
    },
    renderContratos: function () {
        if (!this.props.contratos) {
            return;
        }

        var contratos = [];

        this.props.contratos.forEach(function (contrato) {
            contratos.push(
                <tr key={contrato.id}>
                    <td>{contrato.numeroContrato}</td>
                    <td>{contrato.cliente.nombre + ' ' + contrato.cliente.apellidoPaterno + ' ' + contrato.cliente.apellidoMaterno}</td>
                    <td>{contrato.vehiculo.modelo}</td>
                    <td>{contrato.vehiculo.anio}</td>
                    <td>{contrato.vehiculo.marca}</td>
                    <td>{contrato.vehiculo.distribuidor}</td>
                    <td>{contrato.monto}</td>
                    <td>{contrato.plazo}</td>
                    <td>{contrato.tasa + '%'}</td>
                </tr>
            );
        });

        return contratos;
    }
});

module.exports = ContratosLista;
