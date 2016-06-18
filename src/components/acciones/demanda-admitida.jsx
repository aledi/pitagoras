'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

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
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {tipoJuicio: 'oralMercantil'}
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
                        value='ejecutivaMercantil'
                        checked={respuestas.tipoJuicio === 'ejecutivaMercantil'}
                        onChange={this.handleRadioChange} />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
                <label>Número de Registro</label>
                <input
                    type='text'
                    value={respuestas.numeroRegistro}
                    onChange={this.handleChange.bind(this, 'numeroRegistro')} />
                <label>Juzgado</label>
                <input
                    type='text'
                    value={respuestas.juzgado}
                    onChange={this.handleChange.bind(this, 'juzgado')} />
                <label>Fecha de Presentación</label>
                <input
                    type='text'
                    value={respuestas.fechaPresentacion}
                    onChange={this.handleChange.bind(this, 'fechaPresentacion')} />
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.tipoJuicio = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaAdmitida;
