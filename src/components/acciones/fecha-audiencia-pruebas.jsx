'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('../shared/date-select');
var TimeSelect = require('../shared/time-select');

// -----------------------------------------------------------------------------------------------
// Fecha Audiencia Pruebas (Ejecutiva)
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPruebas = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 21,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                atendido: lastAccion ? lastAccion.respuestas.atendido : '',
                fecha: lastAccion ? lastAccion.respuestas.fecha : null,
                hora: lastAccion ? lastAccion.respuestas.hora : null,
                citacion: lastAccion ? lastAccion.respuestas.citacion : false
            },
            disabled: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='fecha-audiencia-pruebas accion-form'>
                <div className='element-wrapper'>
                    <h5>Atendido por</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.atendido}
                        onChange={this.handleChange.bind(this, 'atendido')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange.bind(this, 'fecha')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora</h5>
                    <TimeSelect time={this.state.respuestas.hora} onChange={this.handleHoraChange.bind(this, 'hora')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Citación a Sentencia</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.citacion}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.citacion}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                <h5>Continuación de Audiencia</h5>
                {this.renderFecha(1)}
                {this.renderFecha(2)}
                {this.renderFecha(3)}
                {this.renderAddDateButton()}

                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderAddDateButton: function () {
        if (this.state.respuestas.fecha1 && this.state.respuestas.fecha2 && this.state.respuestas.fecha3) {
            return;
        }

        return (<button type='button' className='add' onClick={this.addDate}>Agregar nueva fecha</button>);
    },
    renderFecha: function (num) {
        if (!this.state.respuestas['fecha' + num] && this.state.respuestas['fecha' + num] !== null) {
            return;
        }

        return (
            <div>
                <div className='element-wrapper'>
                    <h5>{'Fecha ' + num}</h5>
                    <DateSelect date={this.state.respuestas['fecha' + num]} onChange={this.handleFechaChange.bind(this, 'fecha' + num)} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>{'Hora ' + num}</h5>
                    <TimeSelect time={this.state.respuestas['hora' + num]} onChange={this.handleHoraChange.bind(this, 'hora' + num)} />
                </div>
            </div>
        );
    },
    addDate: function () {
        var respuestas = this.state.respuestas;

        if (!respuestas.fecha1) {
            respuestas.fecha1 = null;
            respuestas.hora1 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fecha2) {
            respuestas.fecha2 = null;
            respuestas.hora2 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fecha3) {
            respuestas.fecha3 = null;
            respuestas.hora3 = null;
            this.setState({respuestas: respuestas});
        }
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.citacion = parseInt(event.target.value, 10) === 1;

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (key, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = date ? date.clone() : null;

        this.setState(state);
    },
    handleHoraChange: function (key, time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = time;

        this.setState(state);
    }
});

module.exports = FechaAudienciaPruebas;
