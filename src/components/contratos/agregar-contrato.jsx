'use strict';

require('./agregar-contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');
var ContratosStore = require('src/stores/contratos-store.js');

// -----------------------------------------------------------------------------------------------
// Agregar Contrato
// -----------------------------------------------------------------------------------------------

var AgregarContrato = React.createClass({
    getInitialState: function () {
        return new ContratoRecord().toEditable();
    },
    componentDidMount: function () {
        this.storeListener = ContratosStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.storeListener.remove();
    },
    onChange: function () {
        var error = ContratosStore.get('saveError');
        var feedbackText = '';

        if (error) {
            feedbackText = 'Error al guardar el contrato.';
        } else {
            feedbackText = 'El contrato se ha guardado.';
        }

        this.setState({feedbackText: feedbackText});
    },
    render: function () {
        console.log(this.state)
        return (
            <main className='add-contrato'>
                <form onSubmit={this.handleAddContract}>
                    <p className='section-title'>Contrato</p>
                    <div className='input-wrapper'>
                        <label>Número de Contrato</label>
                        <input type='text' value={this.state.numeroContrato} onChange={this.handleChange.bind(this, 'numeroContrato')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Día</label>
                        <select value={this.state.fechaContrato.dia} onChange={this.handleFechaChange.bind(this, 'dia')}>
                            {this.renderDias()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Mes</label>
                        <select value={this.state.fechaContrato.mes} onChange={this.handleFechaChange.bind(this, 'mes')}>
                            {this.renderMeses()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Año</label>
                        <select value={this.state.fechaContrato.anio} onChange={this.handleFechaChange.bind(this, 'anio')}>
                            {this.renderAnios()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Plazo</label>
                        <input type='text' value={this.state.plazo} onChange={this.handleChange.bind(this, 'plazo')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Monto</label>
                        <input type='text' value={this.state.monto} onChange={this.handleChange.bind(this, 'monto')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tasa</label>
                        <input type='text' value={this.state.tasa} onChange={this.handleChange.bind(this, 'tasa')} />
                    </div>
                    <hr />
                    <p className='section-title'>Vehículo</p>
                    <div className='input-wrapper'>
                        <label>Modelo</label>
                        <input type='text' value={this.state.vehiculo.modelo} onChange={this.handleVehiculoChange.bind(this, 'modelo')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Marca</label>
                        <input type='text' value={this.state.vehiculo.marca} onChange={this.handleVehiculoChange.bind(this, 'marca')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Clase</label>
                        <input type='text' value={this.state.vehiculo.clase} onChange={this.handleVehiculoChange.bind(this, 'clase')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Distribuidor</label>
                        <input type='text' value={this.state.vehiculo.distribuidor} onChange={this.handleVehiculoChange.bind(this, 'distribuidor')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Año</label>
                        <input type='text' value={this.state.vehiculo.anio} onChange={this.handleVehiculoChange.bind(this, 'anio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Serie</label>
                        <input type='text' value={this.state.vehiculo.serie} onChange={this.handleVehiculoChange.bind(this, 'serie')} />
                    </div>
                    <hr />
                    <p className='section-title'>Cliente</p>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input type='text' value={this.state.cliente.nombre} onChange={this.handleClienteChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Paterno</label>
                        <input type='text' value={this.state.cliente.apellidoPaterno} onChange={this.handleClienteChange.bind(this, 'apellidoPaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Materno</label>
                        <input type='text' value={this.state.cliente.apellidoMaterno} onChange={this.handleClienteChange.bind(this, 'apellidoMaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Calle</label>
                        <input type='text' value={this.state.cliente.domicilio.calle} onChange={this.handleDomicilioChange.bind(this, 'calle')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Exterior</label>
                        <input type='text' value={this.state.cliente.domicilio.exterior} onChange={this.handleDomicilioChange.bind(this, 'exterior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Interior</label>
                        <input type='text' value={this.state.cliente.domicilio.interior} onChange={this.handleDomicilioChange.bind(this, 'interior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Colonia</label>
                        <input type='text' value={this.state.cliente.domicilio.colonia} onChange={this.handleDomicilioChange.bind(this, 'colonia')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Código Postal</label>
                        <input type='text' value={this.state.cliente.domicilio.codigoPostal} onChange={this.handleDomicilioChange.bind(this, 'codigoPostal')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Municipio / Delegación</label>
                        <input type='text' value={this.state.cliente.domicilio.municipio} onChange={this.handleDomicilioChange.bind(this, 'municipio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Estado</label>
                        <input type='text' value={this.state.cliente.domicilio.estado} onChange={this.handleDomicilioChange.bind(this, 'estado')} />
                    </div>
                    {this.renderTelefonos()}
                    <button type='button' className='add' onClick={this.addTelefono}>Agregar nuevo teléfono</button>
                    <hr />
                    <p className='section-title'>Referencias</p>
                    {this.renderReferencias()}
                    <button type='button' className='add' onClick={this.addReferencia}>Agregar nueva referencia</button>
                    <button type='submit'>Agregar Contrato</button>
                    {this.renderFeedbackText()}
                </form>
            </main>
        );
    },
    renderFeedbackText: function () {
        if (!this.state.feedbackText) {
            return;
        }

        return (<p>{this.state.feedbackText}</p>);
    },
    renderTelefonos: function () {
        var telefonos = this.state.cliente.telefonos;

        if (telefonos.length === 1) {
            return (
                <div className='input-wrapper'>
                    <label>Teléfono 1</label>
                    <input type='text' value={this.state.cliente.telefonos[0]} onChange={this.handleTelefonosChange.bind(this, 'telefonos', 0)} />
                </div>
            );
        }

        var self = this;
        return telefonos.map(function (telefono, index) {
            return (
                <div key={'telefono-' + index} className='input-wrapper'>
                    <label>{'Teléfono ' + (index + 1)}</label>
                    <input type='text' value={self.state.cliente.telefonos[index]} onChange={self.handleTelefonosChange.bind(self, 'telefonos', index)} />
                </div>
            );
        });
    },
    renderReferencias: function () {
        var referencias = this.state.referencias;

        if (!referencias.length) {
            return;
        }

        var self = this;
        return referencias.map(function (referencia, index) {
            return (
                <div key={'referencia-' + index} className='referencia-wrapper'>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input type='text' value={referencia.nombre} onChange={self.handleReferenciaChange.bind(self, 'nombre', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Paterno</label>
                        <input type='text' value={referencia.apellidoPaterno} onChange={self.handleReferenciaChange.bind(self, 'apellidoPaterno', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Materno</label>
                        <input type='text' value={referencia.apellidoMaterno} onChange={self.handleReferenciaChange.bind(self, 'apellidoMaterno', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Calle</label>
                        <input type='text' value={referencia.domicilio.calle} onChange={self.handleReferenciaDomicilioChange.bind(self, 'calle', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Exterior</label>
                        <input type='text' value={referencia.domicilio.exterior} onChange={self.handleReferenciaDomicilioChange.bind(self, 'exterior', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Interior</label>
                        <input type='text' value={referencia.domicilio.interior} onChange={self.handleReferenciaDomicilioChange.bind(self, 'interior', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Colonia</label>
                        <input type='text' value={referencia.domicilio.colonia} onChange={self.handleReferenciaDomicilioChange.bind(self, 'colonia', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Código Postal</label>
                        <input type='text' value={referencia.domicilio.codigoPostal} onChange={self.handleReferenciaDomicilioChange.bind(self, 'codigoPostal', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Municipio / Delegación</label>
                        <input type='text' value={referencia.domicilio.municipio} onChange={self.handleReferenciaDomicilioChange.bind(self, 'municipio', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Estado</label>
                        <input type='text' value={referencia.domicilio.estado} onChange={self.handleReferenciaDomicilioChange.bind(self, 'estado', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Teléfono</label>
                        <input type='text' value={referencia.telefono} onChange={self.handleReferenciaChange.bind(self, 'telefono', index)} />
                    </div>
                    <hr />
                </div>
            );
        });
    },
    addTelefono: function (event) {
        event.preventDefault();

        var cliente = this.state.cliente;
        cliente.telefonos.push('');

        this.setState({cliente: cliente});
    },
    addReferencia: function (event) {
        event.preventDefault();

        var referencias = this.state.referencias;

        referencias.push({
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            domicilio: {
                calle: '',
                interior: '',
                exterior: '',
                colonia: '',
                municipio: '',
                codigoPostal: '',
                estado: ''
            },
            telefono: ''
        });

        this.setState({referencias: referencias});
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state[propertyName] = event.target.value;

        this.setState(state);
    },
    handleFechaChange: function (propertyName, event) {
        var state = {fechaContrato: this.state.fechaContrato};
        state.fechaContrato[propertyName] = event.target.value;

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
    handleReferenciaChange: function (propertyName, index, event) {
        var state = {referencias: this.state.referencias};
        state.referencias[index][propertyName] = event.target.value;

        this.setState(state);
    },
    handleTelefonosChange: function (propertyName, index, event) {
        var state = {cliente: this.state.cliente};
        state.cliente.telefonos[index] = event.target.value;

        this.setState(state);
    },
    handleDomicilioChange: function (propertyName, event) {
        var state = {cliente: this.state.cliente};
        state.cliente.domicilio[propertyName] = event.target.value;

        this.setState(state);
    },
    handleReferenciaDomicilioChange: function (propertyName, index, event) {
        var state = {referencias: this.state.referencias};
        state.referencias[index].domicilio[propertyName] = event.target.value;

        this.setState(state);
    },
    handleAddContract: function (event) {
        event.preventDefault();

        ContratosActions.saveContrato(ContratoRecord.prepareForParse(this.state));
    },
    renderDias: function (event) {
        var dias = [];
        var limite = this.getDaysForMonth(this.state.fechaContrato['mes'], this.state.fechaContrato['anio']);

        for (var index = 1; index <= limite; index++) {
            dias.push(
                <option key={index} value={index}>{index}</option>
            );
        }

        return dias;
    },
    renderMeses: function (event) {
        var meses = [];

        for (var index = 1; index <= 12; index++) {
            meses.push(
                <option key={index} value={index}>{this.getMonthByNumber(index)}</option>
            );
        }

        return meses;
    },
    renderAnios: function (event) {
        var anios = [];
        var actual = new Date().getFullYear();

        for (var index = actual; index >= actual - 25; index--) {
            anios.push(
                <option key={index} value={index}>{index}</option>
            );
        }

        return anios;
    },
    getMonthByNumber: function (mes) {
        switch (mes) {
            case 1:
                return 'Enero';
            case 2:
                return 'Febrero';
            case 3:
                return 'Marzo';
            case 4:
                return 'Abril';
            case 5:
                return 'Mayo';
            case 6:
                return 'Junio';
            case 7:
                return 'Julio';
            case 8:
                return 'Agosto';
            case 9:
                return 'Septiembre';
            case 10:
                return 'Octubre';
            case 11:
                return 'Noviembre';
            case 12:
                return 'Diciembre';
        }
    },
    getDaysForMonth: function (mes, anio) {
        if (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
            return 31;
        } else if (mes == 2) {
            return (((anio % 4 === 0) && (anio % 100 !== 0)) || (anio % 400 === 0)) ? 29 : 28;
        }

        return 30;
    }
});

module.exports = AgregarContrato;
