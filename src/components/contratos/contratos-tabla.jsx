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
            <div className='table-wrapper'>
                <div className='table-header-wrapper' style={{minWidth: '2750px'}}>
                    <table>
                        <thead>
                            <tr className='header'>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Número de Contrato</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Juzgado</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Nombre de Cliente</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Modelo Vehículo</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Marca</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Año</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Distribuidor</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Monto</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Plazo</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Tasa</span>
                                </th>
                                <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                    <span className='ellipsis-text'>Especial</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                {this.renderTableBodyWrapper()}
            </div>
        );
    },
    renderTableBodyWrapper: function () {
        return (
            <div className='table-body-wrapper' style={{minWidth: '2750px'}}>
                {this.renderTableBody()}
            </div>
        );
    },
    renderTableBody: function () {
        return (
            <table className='table-body'>
                <tbody>
                    {this.renderContratos()}
                </tbody>
            </table>
        );
    },
    renderContratos: function () {
        if (!this.props.contratos) {
            return;
        }

        var contratos = [];
        var self = this;

        this.props.contratos.forEach(function (contrato) {
            contratos.push(
                <tr className='content-row' onClick={self.goToContrato.bind(self, contrato.id)} key={contrato.id}>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.numeroContrato}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.juzgado}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.cliente.formattedValues.nombre}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.vehiculo.modelo}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.vehiculo.marca}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.vehiculo.anio}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.vehiculo.distribuidor}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.formattedValues.monto}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.plazo}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.formattedValues.tasa}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.formattedValues.especial}</span></td>
                </tr>
            );
        });

        return contratos;
    },
    goToContrato: function (id) {
        this.context.router.push('/contratos/' + id);
    }
});

module.exports = ContratosTabla;
