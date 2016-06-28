'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// PresentacionDemanda
// -----------------------------------------------------------------------------------------------

var PresentacionDemanda = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 3,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                tipoJuicio: 'Oral Mercantil',
                fecha: null
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
        var respuestas = this.state.respuestas;

        return (
            <div className='presentacion-demanda accion-form'>
                <div className='element-wrapper'>
                    <h5>Tipo de Juicio</h5>
                    <div>
                        <input
                            type='radio'
                            id='oral'
                            value='Oral Mercantil'
                            checked={this.state.respuestas.tipoJuicio === 'Oral Mercantil'}
                            onChange={this.handleChange.bind(this, 'tipoJuicio')}
                            disabled={this.state.disabled} />
                        <label htmlFor='oral' disabled={this.state.disabled}>Oral Mercantil</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='ejecutiva'
                            value='Ejecutiva Mercantil'
                            checked={this.state.respuestas.tipoJuicio === 'Ejecutiva Mercantil'}
                            onChange={this.handleChange.bind(this, 'tipoJuicio')}
                            disabled={this.state.disabled} />
                        <label htmlFor='ejecutiva' disabled={this.state.disabled}>Ejecutiva Mercantil</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5>Número de Registro</h5>
                    <input
                        type='text'
                        value={respuestas.numeroRegistro}
                        onChange={this.handleChange.bind(this, 'numeroRegistro')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Juzgado</h5>
                    <input
                        type='text'
                        value={respuestas.juzgado}
                        onChange={this.handleChange.bind(this, 'juzgado')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Presentación</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>
                <div className='element-wrapper'>
                    <h5>Expediente Judicial</h5>
                    <input
                        type='text'
                        value={respuestas.expedienteJudicial}
                        onChange={this.handleChange.bind(this, 'expedienteJudicial')}
                        disabled={this.state.disabled} />
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
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
    }
});

module.exports = PresentacionDemanda;
