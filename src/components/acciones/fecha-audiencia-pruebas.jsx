'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// FechaAudienciaPruebas
// -----------------------------------------------------------------------------------------------

var FechaAudienciaPruebas = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 21,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                fecha: moment(),
                hora: '8:00 am',
                citacion: false,
                fecha1: moment(),
                hora1: '8:00 am',
                fecha2: moment(),
                hora2: '8:00 am',
                fecha3: moment(),
                hora3: '8:00 am'
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
            <div className='fecha-audiencia-pruebas accion-form'>
                <div className='element-wrapper'>
                    <h5>Atraído por</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.atraido}
                        onChange={this.handleChange.bind(this, 'atraido')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange.bind(this, 'fecha')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora</h5>
                    <TimeSelect time={this.state.respuestas.hora} onChange={this.handleHoraChange.bind(this, 'hora')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Citación a Sentencia</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.citacion}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.citacion}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                <h5>Continuación de Audiencia</h5>
                <div className='element-wrapper'>
                    <h5>Fecha 1</h5>
                    <DateSelect date={this.state.respuestas.fecha1} onChange={this.handleFechaChange.bind(this, 'fecha1')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora 1</h5>
                    <TimeSelect time={this.state.respuestas.hora1} onChange={this.handleHoraChange.bind(this, 'hora1')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha 2</h5>
                    <DateSelect date={this.state.respuestas.fecha2} onChange={this.handleFechaChange.bind(this, 'fecha2')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora 2</h5>
                    <TimeSelect time={this.state.respuestas.hora2} onChange={this.handleHoraChange.bind(this, 'hora2')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha 3</h5>
                    <DateSelect date={this.state.respuestas.fecha3} onChange={this.handleFechaChange.bind(this, 'fecha3')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Hora 3</h5>
                    <TimeSelect time={this.state.respuestas.hora3} onChange={this.handleHoraChange.bind(this, 'hora3')} />
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
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.citacion = parseInt(event.target.value, 10) === 1;

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (key, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = date.clone();

        this.setState(state);
    },
    handleHoraChange: function (key, time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = time;

        this.setState(state);
    }
});

module.exports = FechaAudienciaPruebas;
