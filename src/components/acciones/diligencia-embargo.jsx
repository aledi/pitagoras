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
// Diligencia de Embargo
// -----------------------------------------------------------------------------------------------

var options = [
    'No encontró el domicilio',
    'El domicilio es incorrecto',
    'La persona no vive ahí',
    'No abre nadie en el domicilio',
    'Fallecimiento',
    'Se realizó exitosamente',
    'Se dejó citatorio'
];

var DiligenciaEmbargo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        var state = {
            tipo: 11,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                resultado: lastAccion ? lastAccion.respuestas.resultado : 'No encontró el domicilio'
            },
            disabled: false
        };

        if (lastAccion && lastAccion.respuestas.cita) {
            state.respuestas.cita = {
                fecha: moment(lastAccion.respuestas.cita.fecha.iso),
                hora: lastAccion.respuestas.cita.hora,
                lugar: lastAccion.respuestas.cita.lugar,
                nombreActuario: lastAccion.respuestas.cita.nombreActuario,
                telefonoActuario: lastAccion.respuestas.cita.telefonoActuario
            };
        }

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='diligencia-embargo accion-form'>
                <div className='element-wrapper'>
                    <select value={options[this.state.respuestas.resultado]} onChange={this.handleChange} disabled={this.state.disabled}>
                        {this.renderOptions()}
                    </select>
                </div>
                {this.renderCitatorio()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderCitatorio: function () {
        if (this.state.respuestas.resultado !== 'Se dejó citatorio') {
            return;
        }

        return (
            <div>
                <h5>Citatorio</h5>
                    <div className='element-wrapper'>
                        <h5 className='text-label'>Fecha de cita</h5>
                        <DateSelect date={this.state.respuestas.cita.fecha} onChange={this.handleCitaFechaChange} />
                    </div>
                    <div className='element-wrapper'>
                        <h5 className='text-label'>Hora de cita</h5>
                        <TimeSelect time={this.state.respuestas.cita.hora} onChange={this.handleCitaHoraChange} />
                    </div>
                    <div className='element-wrapper'>
                        <h5 className='text-label'>Lugar</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.lugar}
                            onChange={this.handleCitaChange.bind(this, 'lugar')}
                            disabled={this.state.disabled} />
                    </div>
                    <div className='element-wrapper'>
                        <h5 className='text-label'>Nombre del actuario</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.nombreActuario}
                            onChange={this.handleCitaChange.bind(this, 'nombreActuario')}
                            disabled={this.state.disabled} />
                    </div>
                    <div className='element-wrapper'>
                        <h5 className='text-label'>Teléfono del actuario</h5>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.telefonoActuario}
                            onChange={this.handleCitaChange.bind(this, 'telefonoActuario')}
                            disabled={this.state.disabled} />
                    </div>
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    handleCitaChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas.cita[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        var resultado = options[event.target.value];
        respuestas.resultado = resultado;

        if (resultado === 'Se dejó citatorio') {
            respuestas.cita = {
                fecha: moment(),
                hora: '8:00 am'
            };
        } else if (respuestas.cita) {
            delete respuestas.cita;
        }

        this.setState({respuestas: respuestas});
    },
    handleCitaFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.cita.fecha = date.clone();

        this.setState(state);
    },
    handleCitaHoraChange: function (time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.cita.hora = time;

        this.setState(state);
    }
});

module.exports = DiligenciaEmbargo;
