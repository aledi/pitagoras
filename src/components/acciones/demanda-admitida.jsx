'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaAdmitida
// -----------------------------------------------------------------------------------------------

var DemandaAdmitida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 9,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        var respuestas = this.state.respuestas;

        return (
            <div className='demanda-admitida'>
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='oralMercantil'
                        checked={respuestas.tipoJuicio === 'oralMercantil'}
                        onChange={this.handleRadioChange} />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='ejectivaMercantil'
                        checked={respuestas.tipoJuicio === 'ejectivaMercantil'}
                        onChange={this.handleRadioChange} />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
                <label>Número de Registro</label>
                <input
                    type='text'
                    value={respuestas.numeroRegistro}
                    onChange={this.handleInputChange.bind(this, 'numeroRegistro')} />
                <label>Juzgado</label>
                <input
                    type='text'
                    value={respuestas.juzgado}
                    onChange={this.handleInputChange.bind(this, 'juzgado')} />
                <label>Fecha de Presentación</label>
                <input
                    type='text'
                    value={respuestas.fechaPresentacion}
                    onChange={this.handleInputChange.bind(this, 'fechaPresentacion')} />
                {this.renderButton()}
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.tipoJuicio = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleInputChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaAdmitida;
