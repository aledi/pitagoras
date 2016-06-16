'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaDesechada
// -----------------------------------------------------------------------------------------------

var DemandaDesechada = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 6,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {
                regresaDocumentos: false,
                horario: null
            }
        };
    },
    render: function () {
        return (
            <div className='demanda-desechada'>
                <p>Motivo</p>
                <select>
                    <option>No coinciden los montos</option>
                    <option>No es la vía elegida (oral, ordinaria, ejecutiva, etc.)</option>
                    <option>Se declara incompetente de conocer el caso</option>
                    <option>Varios conceptos en un solo hecho</option>
                    <option>Se está cobrando doble interés</option>
                    <option>La demanda no es legible</option>
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
                {this.renderButton()}
            </div>
        );
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
