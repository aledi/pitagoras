'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// DemandaDesechada
// -----------------------------------------------------------------------------------------------

var options = [
    'No coinciden los montos',
    'No es la vía elegida (oral, ordinaria, ejecutiva, etc.)',
    'Se declara incompetente de conocer el caso',
    'Varios conceptos en un solo hecho',
    'Se está cobrando doble interés',
    'La demanda no es legible',
    'Otro'
];

var DemandaDesechada = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;
        var state = {
            tipo: 6,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                motivo: lastAccion ? lastAccion.respuestas.motivo : 'No coinciden los montos',
                regresaDocumentos: lastAccion ? lastAccion.respuestas.regresaDocumentos : false
            },
            disabled: false
        };

        if (lastAccion && lastAccion.respuestas.otroMotivo) {
            state.respuestas.otroMotivo = lastAccion.respuestas.otroMotivo;
        }

        if (lastAccion && lastAccion.respuestas.regresaDocumentos) {
            state.respuestas.fecha = lastAccion.respuestas.fecha;
            state.respuestas.horario = {
                start: lastAccion.respuestas.horario.start,
                end: lastAccion.respuestas.horario.end
            };
        }

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='demanda-desechada accion-form'>
                <div className='element-wrapper'>
                    <h5>Motivo</h5>
                    <select value={this.state.respuestas.motivo} onChange={this.handleSelectChange} disabled={this.state.disabled}>
                        {this.renderOptions()}
                    </select>
                </div>
                {this.renderOtroMotivo()}
                <div className='element-wrapper'>
                    <h5>¿Regresan documentos?</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            checked={this.state.respuestas.regresaDocumentos}
                            value={1}
                            onChange={this.handleRegresaDocumentosChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            checked={!this.state.respuestas.regresaDocumentos}
                            value={0}
                            onChange={this.handleRegresaDocumentosChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                {this.renderFecha()}
                {this.renderHorario()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderOtroMotivo: function () {
        if (this.state.respuestas.motivo !== options[options.length - 1]) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5 className='text-label'>Especifique el motivo</h5>
                <input
                    type='text'
                    value={this.state.respuestas.otroMotivo}
                    onChange={this.handleChange.bind(this, 'otroMotivo')}
                    disabled={this.state.disabled} />
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={option}>{option}</option>);
        }));
    },
    renderFecha: function () {
        if (!this.state.respuestas.regresaDocumentos) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5>Fecha de regreso</h5>
                <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
            </div>
        );
    },
    renderHorario: function () {
        if (!this.state.respuestas.regresaDocumentos) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5>Horario</h5>
                <TimeSelect time={this.state.respuestas.horario.start} onChange={this.handleHorarioChange.bind(this, 'start')} />
                <TimeSelect time={this.state.respuestas.horario.end} onChange={this.handleHorarioChange.bind(this, 'end')} />
            </div>
        );
    },
    handleSelectChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.motivo = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleRegresaDocumentosChange: function (event) {
        var respuestas = this.state.respuestas;
        var regresaDocumentos = parseInt(event.target.value, 10) === 1;

        respuestas.regresaDocumentos = regresaDocumentos;

        if (regresaDocumentos) {
            respuestas.fecha = null;
            respuestas.horario = {
                start: null,
                end: null
            };
        } else if (respuestas.fecha) {
            delete respuestas.fecha;
            delete respuestas.horario;
        }

        this.setState({respuestas: respuestas});
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    },
    handleHorarioChange: function (key, time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.horario[key] = time;

        this.setState(state);
    }
});

module.exports = DemandaDesechada;
