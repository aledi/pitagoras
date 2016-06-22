'use strict';

require('./contrato-form.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');
var ContratosStore = require('src/stores/contratos-store.js');

// -----------------------------------------------------------------------------------------------
// Contrato Form
// -----------------------------------------------------------------------------------------------

var ContratoForm = React.createClass({
    getInitialState: function () {
        return {contrato: this.props.contrato ? this.props.contrato.toEditable() : new ContratoRecord().toEditable()};
    },
    componentDidMount: function () {
        this.storeListener = ContratosStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.storeListener.remove();
    },
    onChange: function () {
        var saving = ContratosStore.get('saving');
        var saveError = ContratosStore.get('saveError');
        var feedbackText = '';

        if (this.state.saving && !saving && !saveError) {
            feedbackText = 'El contrato se ha guardado.';
            this.setState({feedbackText: feedbackText});
            return;
        }

        if (this.state.saving && !saving && saveError) {
            feedbackText = 'Error al guardar el contrato.';
            this.setState({feedbackText: feedbackText});
            return;
        }

        this.setState({saving: saving});
    },
    render: function () {
        var contrato = this.state.contrato;

        return (
            <main className='add-contrato'>
                <form onSubmit={this.handleAddContract}>
                    <h3 className='section-title'>Contrato</h3>
                    <div className='input-wrapper'>
                        <label>Número de Contrato</label>
                        <input type='text' value={contrato.numeroContrato} onChange={this.handleChange.bind(this, 'numeroContrato')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Día</label>
                        <select value={contrato.fechaContrato.dia} onChange={this.handleFechaChange.bind(this, 'dia')}>
                            {this.renderDias()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Mes</label>
                        <select value={contrato.fechaContrato.mes} onChange={this.handleFechaChange.bind(this, 'mes')}>
                            {this.renderMeses()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Año</label>
                        <select value={contrato.fechaContrato.anio} onChange={this.handleFechaChange.bind(this, 'anio')}>
                            {this.renderAnios()}
                        </select>
                    </div>
                    <div className='input-wrapper'>
                        <label>Plazo</label>
                        <input type='text' value={contrato.plazo} onChange={this.handleChange.bind(this, 'plazo')} onKeyPress={this.restrictNumericInput.bind(this, false)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Monto</label>
                        <input type='text' value={contrato.monto} onChange={this.handleChange.bind(this, 'monto')} onKeyPress={this.restrictNumericInput.bind(this, true)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tasa</label>
                        <input type='text' value={contrato.tasa} onChange={this.handleChange.bind(this, 'tasa')} onKeyPress={this.restrictNumericInput.bind(this, true)} />
                    </div>
                    <hr />
                    <h3 className='section-title'>Vehículo</h3>
                    <div className='input-wrapper'>
                        <label>Modelo</label>
                        <input type='text' value={contrato.vehiculo.modelo} onChange={this.handleVehiculoChange.bind(this, 'modelo')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Marca</label>
                        <input type='text' value={contrato.vehiculo.marca} onChange={this.handleVehiculoChange.bind(this, 'marca')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Clase</label>
                        <input type='text' value={contrato.vehiculo.clase} onChange={this.handleVehiculoChange.bind(this, 'clase')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Distribuidor</label>
                        <input type='text' value={contrato.vehiculo.distribuidor} onChange={this.handleVehiculoChange.bind(this, 'distribuidor')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Año</label>
                        <input type='text' value={contrato.vehiculo.anio} onChange={this.handleVehiculoChange.bind(this, 'anio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Serie</label>
                        <input type='text' value={contrato.vehiculo.serie} onChange={this.handleVehiculoChange.bind(this, 'serie')} />
                    </div>
                    <hr />
                    <h3 className='section-title'>Cliente</h3>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input type='text' value={contrato.cliente.nombre} onChange={this.handleClienteChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Paterno</label>
                        <input type='text' value={this.state.contrato.cliente.apellidoPaterno} onChange={this.handleClienteChange.bind(this, 'apellidoPaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Materno</label>
                        <input type='text' value={contrato.cliente.apellidoMaterno} onChange={this.handleClienteChange.bind(this, 'apellidoMaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Calle</label>
                        <input type='text' value={contrato.cliente.domicilio.calle} onChange={this.handleDomicilioChange.bind(this, 'calle')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Exterior</label>
                        <input type='text' value={contrato.cliente.domicilio.exterior} onChange={this.handleDomicilioChange.bind(this, 'exterior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Interior</label>
                        <input type='text' value={contrato.cliente.domicilio.interior} onChange={this.handleDomicilioChange.bind(this, 'interior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Colonia</label>
                        <input type='text' value={contrato.cliente.domicilio.colonia} onChange={this.handleDomicilioChange.bind(this, 'colonia')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Código Postal</label>
                        <input type='text' value={contrato.cliente.domicilio.codigoPostal} onChange={this.handleDomicilioChange.bind(this, 'codigoPostal')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Municipio / Delegación</label>
                        <input type='text' value={contrato.cliente.domicilio.municipio} onChange={this.handleDomicilioChange.bind(this, 'municipio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Estado</label>
                        <input type='text' value={contrato.cliente.domicilio.estado} onChange={this.handleDomicilioChange.bind(this, 'estado')} />
                    </div>
                    {this.renderTelefonos()}
                    <button type='button' className='add' onClick={this.addTelefono}>Agregar nuevo teléfono</button>
                    <hr />
                    <h3 className='section-title'>Referencias</h3>
                    {this.renderReferencias()}
                    <button type='button' className='add' onClick={this.addReferencia}>Agregar nueva referencia</button>
                    <button type='submit' className='submit'>Guardar Contrato</button>
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
        var telefonos = this.state.contrato.cliente.telefonos;

        if (telefonos.length === 1) {
            return (
                <div className='input-wrapper'>
                    <label>Teléfono 1</label>
                    <input type='text' value={this.state.contrato.cliente.telefonos[0]} onChange={this.handleTelefonosChange.bind(this, 'telefonos', 0)} />
                </div>
            );
        }

        var self = this;
        return telefonos.map(function (telefono, index) {
            return (
                <div key={'telefono-' + index} className='input-wrapper'>
                    <label>{'Teléfono ' + (index + 1)}</label>
                    <input type='text' value={self.state.contrato.cliente.telefonos[index]} onChange={self.handleTelefonosChange.bind(self, 'telefonos', index)} />
                    {self.renderRemoveButton(index)}
                </div>
            );
        });
    },
    renderRemoveButton: function (index) {
        if (index === 0) {
            return;
        }

        return (
            <button type='button' className='remove remove-input' onClick={this.removeTelefono.bind(this, index)}>Borrar teléfono</button>
        );
    },
    renderReferencias: function () {
        var referencias = this.state.contrato.referencias;

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
                    <button type='button' className='remove' onClick={self.removeReferencia.bind(self, index)}>Eliminar referencia</button>
                </div>
            );
        });
    },
    addTelefono: function (event) {
        event.preventDefault();

        var contrato = this.state.contrato;
        contrato.cliente.telefonos.push('');

        this.setState({contrato: contrato});
    },
    removeTelefono: function (index, event) {
        event.preventDefault();

        var contrato = this.state.contrato;
        contrato.cliente.telefonos.splice(index, 1);

        this.setState({contrato: contrato});
    },
    addReferencia: function (event) {
        event.preventDefault();

        var contrato = this.state.contrato;

        contrato.referencias.push({
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

        this.setState({contrato: contrato});
    },
    removeReferencia: function (index, event) {
        event.preventDefault();

        var contrato = this.state.contrato;
        contrato.referencias.splice(index, 1);

        this.setState({contrato: contrato});
    },
    handleChange: function (propertyName, event) {
        var contrato = this.state.contrato;
        contrato[propertyName] = event.target.value;

        this.setState({contrato: contrato});
    },
    handleFechaChange: function (propertyName, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.fechaContrato[propertyName] = event.target.value;

        this.setState(state);
    },
    handleVehiculoChange: function (propertyName, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.vehiculo[propertyName] = event.target.value;

        this.setState(state);
    },
    handleClienteChange: function (propertyName, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.cliente[propertyName] = event.target.value;

        this.setState(state);
    },
    handleReferenciaChange: function (propertyName, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.referencias[index][propertyName] = event.target.value;

        this.setState(state);
    },
    handleTelefonosChange: function (propertyName, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.cliente.telefonos[index] = event.target.value;

        this.setState(state);
    },
    handleDomicilioChange: function (propertyName, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.cliente.domicilio[propertyName] = event.target.value;

        this.setState(state);
    },
    handleReferenciaDomicilioChange: function (propertyName, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.referencias[index].domicilio[propertyName] = event.target.value;

        this.setState(state);
    },
    handleAddContract: function (event) {
        event.preventDefault();

        ContratosActions.saveContrato(this.state.contrato);
    },
    renderDias: function (event) {
        var dias = [];
        var limite = this.getDaysForMonth(this.state.contrato.fechaContrato.mes, this.state.contrato.fechaContrato.anio);

        for (var index = 1; index <= limite; index++) {
            dias.push(<option key={index} value={index}>{index}</option>);
        }

        return dias;
    },
    renderMeses: function (event) {
        var meses = [];

        for (var index = 1; index <= 12; index++) {
            meses.push(<option key={index} value={index}>{this.getMonthByNumber(index)}</option>);
        }

        return meses;
    },
    renderAnios: function (event) {
        var anios = [];
        var actual = new Date().getFullYear();

        for (var index = actual; index >= actual - 25; index--) {
            anios.push(<option key={index} value={index}>{index}</option>);
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
            default:
                break;
        }
    },
    getDaysForMonth: function (mes, anio) {
        if (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
            return 31;
        } else if (mes === 2) {
            return (((anio % 4 === 0) && (anio % 100 !== 0)) || (anio % 400 === 0)) ? 29 : 28;
        }

        return 30;
    },
    restrictNumericInput: function (isFloat, event) {
        if (!event.metaKey && event.charCode !== 13 && (event.charCode < 48 || event.charCode > 57)) {

            // Allow commans and periods if applicable.
            if (!isFloat) {
                event.preventDefault();
                return;
            }

            if (event.charCode !== 44 && event.charCode !== 46) {
                event.preventDefault();
            }
        }
    }
});

module.exports = ContratoForm;
