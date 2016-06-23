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
            tipo: 8,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {tipoDemanda: 'Oral Mercantil'},
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
        var respuestas = this.state.respuestas;

        return (
            <div className='demanda-admitida accion-form'>
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='Oral Mercantil'
                        checked={respuestas.tipoDemanda === 'Oral Mercantil'}
                        onChange={this.handleRadioChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='oral' disabled={this.state.disabled}>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='Ejecutiva Mercantil'
                        checked={respuestas.tipoDemanda === 'Ejecutiva Mercantil'}
                        onChange={this.handleRadioChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='ejecutiva' disabled={this.state.disabled}>Ejecutiva Mercantil</label>
                </div>
                <label className='text-label'>Fecha</label>
                <input
                    type='text'
                    value={respuestas.fecha}
                    onChange={this.handleChange.bind(this, 'fecha')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Hora</label>
                <input
                    type='text'
                    value={respuestas.hora}
                    onChange={this.handleChange.bind(this, 'hora')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Lugar</label>
                <input
                    type='text'
                    value={respuestas.lugar}
                    onChange={this.handleChange.bind(this, 'lugar')}
                    disabled={this.state.disabled} />
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
