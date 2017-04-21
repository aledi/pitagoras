'use strict';

require('./contratos-tabla.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');

var Search = require('src/components/shared/search');

// -----------------------------------------------------------------------------------------------
// ContratosTabla
// -----------------------------------------------------------------------------------------------

var ContratosTabla = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {showingBusqueda: false};
    },
    componentDidMount: function () {
        document.getElementById('table-wrapper-contratos').focus();
    },
    render: function () {
        return (
            <div>
                <button type='button' className='right-button' onClick={this.toggleBusqueda}>Buscar contrato</button>
                <div id='table-wrapper-contratos' className='contratos-table table-wrapper' tabIndex='0' onKeyUp={this.handleKeyUp}>
                    <div className='table-header-wrapper' style={{minWidth: '2250px'}}>
                        <table>
                            <thead>
                                <tr className='header'>
                                    <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'numeroContrato')}>
                                        <span className='ellipsis-text'>Número de Contrato</span>
                                    </th>
                                    <th style={{width: '350px'}} onClick={ContratosActions.sortContratos.bind(this, 'cliente')}>
                                        <span className='ellipsis-text'>Nombre de Cliente</span>
                                    </th>
                                    <th style={{width: '200px'}} onClick={ContratosActions.sortContratos.bind(this, 'modelo')}>
                                        <span className='ellipsis-text'>Modelo Vehículo</span>
                                    </th>
                                    <th style={{width: '200px'}} onClick={ContratosActions.sortContratos.bind(this, 'marca')}>
                                        <span className='ellipsis-text'>Marca</span>
                                    </th>
                                    <th style={{width: '100px'}} onClick={ContratosActions.sortContratos.bind(this, 'anio')}>
                                        <span className='ellipsis-text'>Año</span>
                                    </th>
                                    <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'distribuidor')}>
                                        <span className='ellipsis-text'>Distribuidor</span>
                                    </th>
                                    <th style={{width: '150px'}} onClick={ContratosActions.sortContratos.bind(this, 'monto')}>
                                        <span className='ellipsis-text'>Monto</span>
                                    </th>
                                    <th style={{width: '100px'}} onClick={ContratosActions.sortContratos.bind(this, 'plazo')}>
                                        <span className='ellipsis-text'>Plazo</span>
                                    </th>
                                    <th style={{width: '100px'}} onClick={ContratosActions.sortContratos.bind(this, 'tasa')}>
                                        <span className='ellipsis-text'>Tasa</span>
                                    </th>
                                    <th style={{width: '100px'}} onClick={ContratosActions.sortContratos.bind(this, 'especial')}>
                                        <span className='ellipsis-text'>Especial</span>
                                    </th>
                                    <th style={{width: '250px'}} onClick={ContratosActions.sortContratos.bind(this, 'juzgado')}>
                                        <span className='ellipsis-text'>Juzgado</span>
                                    </th>
                                    <th style={{width: '200px'}} onClick={ContratosActions.sortContratos.bind(this, 'fechaSeguimiento')}>
                                        <span className='ellipsis-text'>Fecha de Seguimiento</span>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    {this.renderTableBodyWrapper()}
                </div>
                {this.renderBusqueda()}
            </div>
        );
    },
    renderBusqueda: function () {
        if (!this.state.showingBusqueda) {
            return;
        }

        return (<Search onClose={this.toggleBusqueda} />);
    },
    renderTableBodyWrapper: function () {
        return (
            <div id='table-body-wrapper-contratos' className='table-body-wrapper' style={{minWidth: '2050px'}} tabIndex='1'>
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
                    <td style={{width: '350px'}}><span className='ellipsis-text'>{contrato.cliente.formattedValues.nombre}</span></td>
                    <td style={{width: '200px'}}><span className='ellipsis-text'>{contrato.vehiculo.modelo}</span></td>
                    <td style={{width: '200px'}}><span className='ellipsis-text'>{contrato.vehiculo.marca}</span></td>
                    <td style={{width: '100px'}} className='centered'><span className='ellipsis-text'>{contrato.vehiculo.anio}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.vehiculo.distribuidor}</span></td>
                    <td style={{width: '150px'}} className='right'><span className='ellipsis-text'>{contrato.formattedValues.monto}</span></td>
                    <td style={{width: '100px'}} className='centered'><span className='ellipsis-text'>{contrato.plazo}</span></td>
                    <td style={{width: '100px'}} className='centered'><span className='ellipsis-text'>{contrato.formattedValues.tasa}</span></td>
                    <td style={{width: '100px'}} className='centered'><span className='ellipsis-text'>{contrato.formattedValues.especial}</span></td>
                    <td style={{width: '250px'}}><span className='ellipsis-text'>{contrato.juzgado}</span></td>
                    <td style={{width: '200px'}}><span className='ellipsis-text'>{contrato.formattedValues.fechaSeguimiento}</span></td>
                </tr>
            );
        });

        return contratos;
    },
    handleInputChange: function (event) {
        this.setState({busquedaInput: event.target.value});
    },
    toggleBusqueda: function () {
        this.setState({showingBusqueda: !this.state.showingBusqueda});
    },
    goToContrato: function (id) {
        this.context.router.push('/contratos/' + id);
    },
    handleKeyUp: function (event) {
        event.persist();

        // Left & Right arrow
        if (event.keyCode === 37 || event.keyCode === 39) {
            document.getElementById('table-wrapper-contratos').focus();
        }

        // Up & Down arrow
        if (event.keyCode === 38 || event.keyCode === 40) {
            document.getElementById('table-body-wrapper-contratos').focus();
        }
    }
});

module.exports = ContratosTabla;
