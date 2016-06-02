'use strict';

require('./agregar-contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');

// -----------------------------------------------------------------------------------------------
// Agregar Contrato
// -----------------------------------------------------------------------------------------------

var AgregarContrato = React.createClass({
    getInitialState: function () {
        return new ContratoRecord().toEditable();
    },
    render: function () {
        return (
            <main className='add-contrato'>
                <h2>Agregar Contrato</h2>
                <form onSubmit={this.handleAddContract}>
                    <label>Número de Contrato</label>
                    <input type='text' value={this.state.numeroContrato} onChange={this.handleChange.bind(this, 'numeroContrato')} />
                    <label>Fecha de Contrato</label>
                    <input type='text' value={this.state.fechaContrato} onChange={this.handleChange.bind(this, 'fechaContrato')} />
                    <label>Plazo</label>
                    <input type='text' value={this.state.plazo} onChange={this.handleChange.bind(this, 'plazo')} />
                    <label>Monto</label>
                    <input type='text' value={this.state.monto} onChange={this.handleChange.bind(this, 'monto')} />
                    <label>Tasa</label>
                    <input type='text' value={this.state.tasa} onChange={this.handleChange.bind(this, 'tasa')} />

                    <label>Modelo</label>
                    <input type='text' value={this.state.vehiculo.modelo} onChange={this.handleVehiculoChange.bind(this, 'modelo')} />
                    <label>Marca</label>
                    <input type='text' value={this.state.vehiculo.marca} onChange={this.handleVehiculoChange.bind(this, 'marca')} />
                    <label>Clase</label>
                    <input type='text' value={this.state.vehiculo.clase} onChange={this.handleVehiculoChange.bind(this, 'clase')} />
                    <label>Distribuidor</label>
                    <input type='text' value={this.state.vehiculo.distribuidor} onChange={this.handleVehiculoChange.bind(this, 'distribuidor')} />
                    <label>Año</label>
                    <input type='text' value={this.state.vehiculo.anio} onChange={this.handleVehiculoChange.bind(this, 'anio')} />
                    <label>Serie</label>
                    <input type='text' value={this.state.vehiculo.serie} onChange={this.handleVehiculoChange.bind(this, 'serie')} />
                    <button type='submit'>Agregar Contrato</button>
                </form>
            </main>
        );
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state[propertyName] = event.target.value;

        this.setState(state);
    },
    handleVehiculoChange: function (propertyName, event) {
        var state = {vehiculo: this.state.vehiculo};
        state.vehiculo[propertyName] = event.target.value;

        this.setState(state);
    },
    handleDomicilioChange: function (propertyName, event) {
        var state = {cliente: this.state.cliente};
        state.cliente.domicilio[propertyName] = event.target.value;
        this.setState(state);
    },
    handleAddContract: function (event) {
        event.preventDefault();

        ContratosActions.saveContrato(ContratoRecord.prepareForParse(this.state));
    }
});

module.exports = AgregarContrato;
