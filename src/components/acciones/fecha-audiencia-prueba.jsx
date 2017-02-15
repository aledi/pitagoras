'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// Fecha Audiencia Prueba (Oral)
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPrueba = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 14,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                atendido: lastAccion ? lastAccion.respuestas.atendido : '',
                fecha: null,
                hora: '8:00 am'
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
            <div className='fecha-audiencia-prueba accion-form'>
                <div className='element-wrapper'>
                    <h5>Atendido por</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.atendido}
                        onChange={this.handleChange.bind(this, 'atendido')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora</h5>
                    <TimeSelect time={this.state.respuestas.hora} onChange={this.handleHoraChange} />
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
    },
    handleHoraChange: function (time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.hora = time;

        this.setState(state);
    }
});

module.exports = FechaAudienciaPrueba;
