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
                fechaRegreso: null,
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
                <select value={options[this.state.respuestas.motivo]} onChange={this.handleSelectChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
                {this.renderOtroMotivo()}
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
                <label className='text-label'>Especifique el motivo</label>
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
                <label className='text-label'>Fecha de regreso</label>
                <input
                    type='text'
                    value={this.state.fechaRegreso}
                    onChange={this.handleChange.bind(this, 'fechaRegreso')}
                    disabled={this.state.disabled} />
            </div>
        );
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
                    onChange={this.handleChange.bind(this, 'horario')}
                    disabled={this.state.disabled} />
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
    handleChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaDesechada;
