'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaDesechada
// -----------------------------------------------------------------------------------------------

var options = [
    'No coinciden los montos',
    'No es la vía elegida (oral, ordinaria, ejecutiva, etc.)',
    'Se declara incompetente de conocer el caso',
    'Varios conceptos en un solo hecho',
    'Se está cobrando doble interés',
    'La demanda no es legible'
];

var DemandaDesechada = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 6,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                motivo: 'No coinciden los montos',
                regresaDocumentos: false,
                horario: null
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
                <p>Motivo</p>
                <select value={options[this.state.respuestas.motivo]} onChange={this.handleChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
                <p>¿Regresan documentos?</p>
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
                {this.renderHorario()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    renderHorario: function () {
        if (!this.state.respuestas.regresaDocumentos) {
            return;
        }

        return (
            <div>
                <label className='text-label'>Horario</label>
                <input
                    type='text'
                    value={this.state.horario}
                    onChange={this.handleHorarioChange}
                    disabled={this.state.disabled} />
            </div>
        );
    },
    handleSelectChange: function () {
        var respuestas = this.state.respuestas;
        respuestas.motivo = options[event.target.value];
        this.setState({respuestas: respuestas});
    },
    handleRegresaDocumentosChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.regresaDocumentos = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    },
    handleHorarioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.horario = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaDesechada;
