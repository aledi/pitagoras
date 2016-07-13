'use strict';

require('./contrato-form.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');

var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');
var ContratosStore = require('src/stores/contratos-store.js');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// Contrato Form
// -----------------------------------------------------------------------------------------------

var ContratoForm = React.createClass({
    getInitialState: function () {
        return {
            contrato: this.props.contrato ? this.props.contrato.toEditable() : new ContratoRecord().toEditable(),
            invalidFields: {}
        };
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
            this.setState({
                feedbackText: feedbackText,
                contrato: new ContratoRecord().toEditable(),
                saving: false
            });

            return;
        }

        if (this.state.saving && !saving && saveError) {
            feedbackText = 'Error al guardar el contrato.';
            this.setState({
                feedbackText: feedbackText,
                saving: false
            });

            return;
        }

        this.setState({saving: saving});
    },
    render: function () {
        var contrato = this.state.contrato;

        return (
            <main className='add-contrato'>
                <form onSubmit={this.saveContrato}>
                    <h3 className='section-title'>Contrato</h3>
                    <div className='input-wrapper'>
                        <label>Número de Contrato</label>
                        <input
                            type='text'
                            value={contrato.numeroContrato}
                            className={classNames({invalid: this.state.invalidFields.numeroContrato})}
                            disabled={this.state.saving}
                            onChange={this.handleChange.bind(this, 'numeroContrato')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Plazo</label>
                        <input
                            type='text'
                            value={contrato.plazo}
                            disabled={this.state.saving}
                            onChange={this.handleChange.bind(this, 'plazo')}
                            onKeyPress={this.restrictNumericInput.bind(this, false)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Monto</label>
                        <input
                            type='text'
                            value={contrato.monto}
                            disabled={this.state.saving}
                            onChange={this.handleChange.bind(this, 'monto')}
                            onKeyPress={this.restrictNumericInput.bind(this, true)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Tasa</label>
                        <input
                            type='text'
                            value={contrato.tasa}
                            disabled={this.state.saving}
                            onChange={this.handleChange.bind(this, 'tasa')}
                            onKeyPress={this.restrictNumericInput.bind(this, true)} />
                    </div>
                    <DateSelect
                        date={contrato.fechaContrato}
                        disabled={this.state.saving}
                        onChange={this.handleFechaChange} />
                    <div className='input-wrapper full-width'>
                        <label>¿Recibe Certificación Contable correcta y completa?</label>
                            <div>
                                <input
                                    type='radio'
                                    id='certificacion'
                                    value={1}
                                    checked={this.state.contrato.certificacionContable}
                                    onChange={this.handleRadioChange}
                                    disabled={this.state.disabled} />
                                <label htmlFor='certificacion' disabled={this.state.disabled}>Sí</label>
                            </div>
                            <div>
                                <input
                                    type='radio'
                                    id='noCertificacion'
                                    value={0}
                                    checked={!this.state.contrato.certificacionContable}
                                    onChange={this.handleRadioChange}
                                    disabled={this.state.disabled} />
                                <label htmlFor='noCertificacion' disabled={this.state.disabled}>No</label>
                            </div>
                    </div>
                    <hr />
                    <h3 className='section-title'>Vehículo</h3>
                    <div className='input-wrapper'>
                        <label>Modelo</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.modelo}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'modelo')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Marca</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.marca}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'marca')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Clase</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.clase}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'clase')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Distribuidor</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.distribuidor}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'distribuidor')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Año</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.anio}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'anio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Serie</label>
                        <input
                            type='text'
                            value={contrato.vehiculo.serie}
                            disabled={this.state.saving}
                            onChange={this.handleVehiculoChange.bind(this, 'serie')} />
                    </div>
                    <hr />
                    <h3 className='section-title'>Cliente</h3>
                    <div className='input-wrapper'>
                        <label>Nombre</label>
                        <input
                            type='text'
                            value={contrato.cliente.nombre}
                            className={classNames({invalid: this.state.invalidFields.nombre})}
                            disabled={this.state.saving}
                            onChange={this.handleClienteChange.bind(this, 'nombre')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Paterno</label>
                        <input
                            type='text'
                            value={this.state.contrato.cliente.apellidoPaterno}
                            className={classNames({invalid: this.state.invalidFields.apellidoPaterno})}
                            disabled={this.state.saving}
                            onChange={this.handleClienteChange.bind(this, 'apellidoPaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Materno</label>
                        <input
                            type='text'
                            value={contrato.cliente.apellidoMaterno}
                            disabled={this.state.saving}
                            onChange={this.handleClienteChange.bind(this, 'apellidoMaterno')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Calle</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.calle}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'calle')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Exterior</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.exterior}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'exterior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Interior</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.interior}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'interior')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Colonia</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.colonia}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'colonia')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Código Postal</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.codigoPostal}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'codigoPostal')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Municipio / Delegación</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.municipio}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'municipio')} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Estado</label>
                        <input
                            type='text'
                            value={contrato.cliente.domicilio.estado}
                            disabled={this.state.saving}
                            onChange={this.handleDomicilioChange.bind(this, 'estado')} />
                    </div>
                    {this.renderTelefonos()}
                    <button
                        type='button'
                        className='add'
                        disabled={this.state.saving}
                        onClick={this.addTelefono}>Agregar nuevo teléfono</button>
                    <hr />
                    <h3 className='section-title'>Referencias</h3>
                    {this.renderReferencias()}
                    <button
                        type='button'
                        className='add'
                        disabled={this.state.saving}
                        onClick={this.addReferencia}>Agregar nueva referencia</button>
                    <button
                        type='submit'
                        className='submit'
                        disabled={this.state.saving}>Guardar Contrato</button>
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
                    <input
                        type='text'
                        value={this.state.contrato.cliente.telefonos[0]}
                        disabled={this.state.saving}
                        onChange={this.handleTelefonosChange.bind(this, 'telefonos', 0)} />
                </div>
            );
        }

        var self = this;
        return telefonos.map(function (telefono, index) {
            return (
                <div key={'telefono-' + index} className='input-wrapper'>
                    <label>{'Teléfono ' + (index + 1)}</label>
                    <input
                        type='text'
                        value={self.state.contrato.cliente.telefonos[index]}
                        disabled={self.state.saving}
                        onChange={self.handleTelefonosChange.bind(self, 'telefonos', index)} />
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
            <button
                type='button'
                className='remove remove-input'
                disabled={this.state.saving}
                onClick={this.removeTelefono.bind(this, index)}>Borrar teléfono</button>
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
                        <input
                            type='text'
                            value={referencia.nombre}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaChange.bind(self, 'nombre', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Paterno</label>
                        <input
                            type='text'
                            value={referencia.apellidoPaterno}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaChange.bind(self, 'apellidoPaterno', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Apellido Materno</label>
                        <input
                            type='text'
                            value={referencia.apellidoMaterno}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaChange.bind(self, 'apellidoMaterno', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Calle</label>
                        <input
                            type='text'
                            value={referencia.domicilio.calle}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'calle', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Exterior</label>
                        <input
                            type='text'
                            value={referencia.domicilio.exterior}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'exterior', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Número Interior</label>
                        <input
                            type='text'
                            value={referencia.domicilio.interior}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'interior', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Colonia</label>
                        <input
                            type='text'
                            value={referencia.domicilio.colonia}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'colonia', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Código Postal</label>
                        <input
                            type='text'
                            value={referencia.domicilio.codigoPostal}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'codigoPostal', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Municipio / Delegación</label>
                        <input
                            type='text'
                            value={referencia.domicilio.municipio}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'municipio', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Estado</label>
                        <input
                            type='text'
                            value={referencia.domicilio.estado}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaDomicilioChange.bind(self, 'estado', index)} />
                    </div>
                    <div className='input-wrapper'>
                        <label>Teléfono</label>
                        <input
                            type='text'
                            value={referencia.telefono}
                            disabled={self.state.saving}
                            onChange={self.handleReferenciaChange.bind(self, 'telefono', index)} />
                    </div>
                    <button
                        type='button'
                        className='remove'
                        disabled={self.state.saving}
                        onClick={self.removeReferencia.bind(self, index)}>Eliminar referencia</button>
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
    handleChange: function (key, event) {
        var state = {contrato: this.state.contrato, invalidFields: this.state.invalidFields};
        state.contrato[key] = event.target.value;

        if (key === 'numeroContrato' && this.state.invalidFields && this.state.invalidFields.numeroContrato) {
            state.invalidFields.numeroContrato = false;
        }

        this.setState(state);
    },
    handleRadioChange: function (event) {
        var state = {contrato: this.state.contrato};
        state.contrato.certificacionContable = parseInt(event.target.value, 10) === 1;
        this.setState(state);
    },
    handleFechaChange: function (date) {
        var state = {contrato: this.state.contrato};
        state.contrato.fechaContrato = date;

        this.setState(state);
    },
    handleVehiculoChange: function (key, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.vehiculo[key] = event.target.value;

        this.setState(state);
    },
    handleClienteChange: function (key, event) {
        var state = {contrato: this.state.contrato, invalidFields: this.state.invalidFields};
        state.contrato.cliente[key] = event.target.value;

        if (key === 'nombre' && this.state.invalidFields && this.state.invalidFields.nombre) {
            state.invalidFields.nombre = false;
        } else if (key === 'apellidoPaterno' && this.state.invalidFields && this.state.invalidFields.apellidoPaterno) {
            state.invalidFields.apellidoPaterno = false;
        }

        this.setState(state);
    },
    handleReferenciaChange: function (key, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.referencias[index][key] = event.target.value;

        this.setState(state);
    },
    handleTelefonosChange: function (key, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.cliente.telefonos[index] = event.target.value;

        this.setState(state);
    },
    handleDomicilioChange: function (key, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.cliente.domicilio[key] = event.target.value;

        this.setState(state);
    },
    handleReferenciaDomicilioChange: function (key, index, event) {
        var state = {contrato: this.state.contrato};
        state.contrato.referencias[index].domicilio[key] = event.target.value;

        this.setState(state);
    },
    saveContrato: function (event) {
        event.preventDefault();

        var contrato = this.state.contrato;
        var state = this.state.invalidFields;
        var invalidFields = false;

        if (!contrato.numeroContrato || !contrato.numeroContrato.trim()) {
            state.numeroContrato = true;
            invalidFields = true;
        }

        if (!contrato.cliente.nombre || !contrato.cliente.nombre.trim()) {
            state.nombre = true;
            invalidFields = true;
        }

        if (!contrato.cliente.apellidoPaterno || !contrato.cliente.apellidoPaterno.trim()) {
            state.apellidoPaterno = true;
            invalidFields = true;
        }

        if (invalidFields) {
            this.setState(state);
            return;
        }

        ContratosActions.saveContrato(contrato);
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
