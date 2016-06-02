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
                    <hr />
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
                    <hr />
                    <label>Nombre</label>
                    <input type='text' value={this.state.cliente.nombre} onChange={this.handleClienteChange.bind(this, 'nombre')} />
                    <label>Apellido Paterno</label>
                    <input type='text' value={this.state.cliente.apellidoPaterno} onChange={this.handleClienteChange.bind(this, 'apellidoPaterno')} />
                    <label>Apellido Materno</label>
                    <input type='text' value={this.state.cliente.apellidoMaterno} onChange={this.handleClienteChange.bind(this, 'apellidoMaterno')} />
                    <hr />
                    <label>Calle</label>
                    <input type='text' value={this.state.cliente.domicilio.calle} onChange={this.handleDomicilioChange.bind(this, 'calle')} />
                    <label>Número Interior</label>
                    <input type='text' value={this.state.cliente.domicilio.interior} onChange={this.handleDomicilioChange.bind(this, 'interior')} />
                    <label>Número Exterior</label>
                    <input type='text' value={this.state.cliente.domicilio.exterior} onChange={this.handleDomicilioChange.bind(this, 'exterior')} />
                    <label>Colonia</label>
                    <input type='text' value={this.state.cliente.domicilio.colonia} onChange={this.handleDomicilioChange.bind(this, 'colonia')} />
                    <label>Municipio</label>
                    <input type='text' value={this.state.cliente.domicilio.municipio} onChange={this.handleDomicilioChange.bind(this, 'municipio')} />
                    <label>Código Postal</label>
                    <input type='text' value={this.state.cliente.domicilio.codigo} onChange={this.handleDomicilioChange.bind(this, 'codigo')} />
                    <label>Estado</label>
                    <input type='text' value={this.state.cliente.domicilio.estado} onChange={this.handleDomicilioChange.bind(this, 'estado')} />
                    <hr />
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
    handleClienteChange: function (propertyName, event) {
        var state = {cliente: this.state.cliente};
        state.cliente[propertyName] = event.target.value;

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
