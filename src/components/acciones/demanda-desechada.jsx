'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// DemandaDesechada
// -----------------------------------------------------------------------------------------------

var DemandaDesechada = React.createClass({
    getInitialState: function () {
        return {
            regresaDocumentos: false,
            horario: null
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
                    <input type='radio' id='si' checked={this.state.regresaDocumentos} onChange={this.handleRegresaDocumentosChange} value={1} />
                    <label htmlFor='si'>Sí</label>
                </div>
                <div>
                    <input type='radio' id='no' checked={!this.state.regresaDocumentos} onChange={this.handleRegresaDocumentosChange} value={0} />
                    <label htmlFor='no'>No</label>
                </div>
                {this.renderHorario()}
            </div>
        );
    },
    renderHorario: function () {
        if (!this.state.regresaDocumentos) {
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
        this.setState({regresaDocumentos: parseInt(event.target.value, 10) === 1});
    },
    handleHorarioChange: function (event) {
        this.setState({horario: event.target.value});
    }
});

module.exports = DemandaDesechada;
