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
            respuestas: {tipoDemanda: 'oralMercantil'}
        };
    },
    render: function () {
        var respuestas = this.state.respuestas;

        return (
            <div className='demanda-admitida accion-form'>
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='oralMercantil'
                        checked={respuestas.tipoDemanda === 'oralMercantil'}
                        onChange={this.handleRadioChange} />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='ejecutivaMercantil'
                        checked={respuestas.tipoDemanda === 'ejecutivaMercantil'}
                        onChange={this.handleRadioChange} />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
                <label>Fecha</label>
                <input
                    type='text'
                    value={respuestas.fecha}
                    onChange={this.handleChange.bind(this, 'fecha')} />
                <label>Hora</label>
                <input
                    type='text'
                    value={respuestas.hora}
                    onChange={this.handleChange.bind(this, 'hora')} />
                <label>Lugar</label>
                <input
                    type='text'
                    value={respuestas.lugar}
                    onChange={this.handleChange.bind(this, 'lugar')} />
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.tipoDemanda = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaAdmitida;
