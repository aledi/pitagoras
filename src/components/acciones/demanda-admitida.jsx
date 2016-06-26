'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// DemandaAdmitida
// -----------------------------------------------------------------------------------------------

var options = [
    'No vive en el domicilio',
    'Se niega a recibir demanda',
    'Se realizó exitosamente'
];

var DemandaAdmitida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 9,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                tipoDemanda: 'Oral Mercantil',
                resultado: 'No vive en el domicilio',
                cita: {}
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
                <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
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
                {this.renderResultadoSelect()}
                {this.renderTextInputs()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderResultadoSelect: function () {
        if (this.state.respuestas.tipoDemanda !== 'Oral Mercantil') {
            return;
        }

        return (
            <div>
                <label className='text-label'>Resultado de Emplazamiento</label>
                <select value={options[this.state.respuestas.resultado]} onChange={this.handleChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    renderTextInputs: function () {
        if (this.state.respuestas.tipoDemanda !== 'Ejecutiva Mercantil') {
            return;
        }

        return (
            <div>
                <p>Citatorio</p>
                <div>
                    <label className='text-label'>Fecha de cita</label>
                    <DateSelect date={this.state.respuestas.cita.fecha} onChange={this.handleCitaFechaChange} />
                </div>
                <div>
                    <label className='text-label'>Lugar</label>
                    <input
                        type='text'
                        value={this.state.respuestas.cita.lugar}
                        onChange={this.handleCitaChange.bind(this, 'lugar')}
                        disabled={this.state.disabled} />
                </div>
                <div>
                    <label className='text-label'>Nombre del actuario</label>
                    <input
                        type='text'
                        value={this.state.respuestas.cita.nombreActuario}
                        onChange={this.handleCitaChange.bind(this, 'nombreActuario')}
                        disabled={this.state.disabled} />
                </div>
                <div>
                    <label className='text-label'>Teléfono del actuario</label>
                    <input
                        type='text'
                        value={this.state.respuestas.cita.telefonoActuario}
                        onChange={this.handleCitaChange.bind(this, 'telefonoActuario')}
                        disabled={this.state.disabled} />
                </div>
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.tipoDemanda = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleCitaChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas.cita[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    },
    handleCitaFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.cita.fecha = date.clone();

        this.setState(state);
    }
});

module.exports = DemandaAdmitida;
