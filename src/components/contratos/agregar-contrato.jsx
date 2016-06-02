'use strict';

require('./agregar-contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');
var VehiculoRecord = require('src/records/vehiculo');
var VehiculoObject = Parse.Object.extend('Vehiculo');

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
                    <input type='text' value={this.state.numeroContrato} onChange={this.handleChange.bind(this, 'numeroContrato', false)} />
                    <label>Fecha de Contrato</label>
                    <input type='text' value={this.state.fechaContrato} onChange={this.handleChange.bind(this, 'fechaContrato', false)} />
                    <label>Plazo</label>
                    <input type='text' value={this.state.plazo} onChange={this.handleChange.bind(this, 'plazo', true)} />
                    <label>Monto</label>
                    <input type='text' value={this.state.monto} onChange={this.handleChange.bind(this, 'monto', true)} />
                    <label>Tasa</label>
                    <input type='text' value={this.state.tasa} onChange={this.handleChange.bind(this, 'tasa', true)} />

                    <label>Modelo</label>
                    <input type='text' value={this.state.vehiculo.modelo} onChange={this.handleVehiculoChange.bind(this, 'modelo', false)} />
                    <label>Marca</label>
                    <input type='text' value={this.state.vehiculo.marca} onChange={this.handleVehiculoChange.bind(this, 'marca', false)} />
                    <label>Clase</label>
                    <input type='text' value={this.state.vehiculo.clase} onChange={this.handleVehiculoChange.bind(this, 'clase', false)} />
                    <label>Distribuidor</label>
                    <input type='text' value={this.state.vehiculo.distribuidor} onChange={this.handleVehiculoChange.bind(this, 'distribuidor', false)} />
                    <label>Año</label>
                    <input type='text' value={this.state.vehiculo.anio} onChange={this.handleVehiculoChange.bind(this, 'anio', true)} />
                    <label>Serie</label>
                    <input type='text' value={this.state.vehiculo.serie} onChange={this.handleVehiculoChange.bind(this, 'serie', false)} />
                    <button type='submit'>Agregar Contrato</button>
                </form>
            </main>
        );
    },
    handleChange: function (propertyName, parse, event) {
        var state = {};

        if (parse) {
            state[propertyName] = parseInt(event.target.value, 10);
        } else {
            state[propertyName] = event.target.value;
        }

        this.setState(state);
    },
    handleVehiculoChange: function (propertyName, parse, event) {
        var state = {vehiculo: this.state.vehiculo};
        state.vehiculo[propertyName] = event.target.value;

        if (parse) {
            state.vehiculo[propertyName] = parseInt(event.target.value, 10);
        } else {
            state.vehiculo[propertyName] = event.target.value;
        }

        this.setState(state);
    },
    handleDomicilioChange: function (propertyName, event) {
        var state = {cliente: this.state.cliente};
        state.cliente.domicilio[propertyName] = event.target.value;
        this.setState(state);
    },
    handleAddContract: function (event) {
        event.preventDefault();

        var contrato = this.state;
        contrato.vehiculo = new VehiculoRecord(contrato.vehiculo).toEditable();
        contrato.vehiculo = new VehiculoObject(contrato.vehiculo);

        ContratosActions.saveContrato(contrato);
    }
});

module.exports = AgregarContrato;
