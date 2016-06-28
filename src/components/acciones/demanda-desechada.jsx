'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

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
        return {
            tipo: 5,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                motivo: 'No coinciden los montos',
                regresaDocumentos: false,
                fecha: null,
                horario: {
                    start: null,
                    end: null
                }
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
            <div className='demanda-desechada accion-form'>
                <h5>Motivo</h5>
                <select value={options[this.state.respuestas.motivo]} onChange={this.handleSelectChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
                {this.renderOtroMotivo()}
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
            <div>
                <h5>Especifique el motivo</h5>
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
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    renderFecha: function () {
        if (!this.state.respuestas.regresaDocumentos) {
            return;
        }

        return (
            <div>
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
            <div>
                <h5>Horario</h5>
                <TimeSelect time={this.state.respuestas.horario.start} onChange={this.handleHorarioChange.bind(this, 'start')} />
                <TimeSelect time={this.state.respuestas.horario.end} onChange={this.handleHorarioChange.bind(this, 'end')} />
            </div>
        );
    },
    handleSelectChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.motivo = options[event.target.value];
        this.setState({respuestas: respuestas});
    },
    handleRegresaDocumentosChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.regresaDocumentos = parseInt(event.target.value, 10) === 1;
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
