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
                respuesta: 'No coinciden los montos',
                regresaDocumentos: false,
                horario: null
            }
        };
    },
    render: function () {
        return (
            <div className='demanda-desechada'>
                <p>Motivo</p>
                <select value={options[this.state.respuestas.respuesta]} onChange={this.handleChange}>
                    {this.renderOptions()}
                </select>
                <p>¿Regresan documentos?</p>
                <div>
                    <input
                        type='radio'
                        id='si'
                        checked={this.state.respuestas.regresaDocumentos}
                        value={1}
                        onChange={this.handleRegresaDocumentosChange} />
                    <label htmlFor='si'>Sí</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='no'
                        checked={!this.state.respuestas.regresaDocumentos}
                        value={0}
                        onChange={this.handleRegresaDocumentosChange} />
                    <label htmlFor='no'>No</label>
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
                <label>Horario</label>
                <input type='text' value={this.state.horario} onChange={this.handleHorarioChange} />
            </div>
        );
    },
    handleSelectChange: function () {
        var respuestas = this.state.respuestas;
        respuestas.respuesta = options[event.target.value];
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
