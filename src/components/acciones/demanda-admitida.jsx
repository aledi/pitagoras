'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var moment = require('moment');

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
            tipo: 10,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                tipoJuicio: 'Oral Mercantil',
                resultado: 'No vive en el domicilio',
                fechaAcuerdo: moment(),
                fechaPublicacion: moment()
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
                <div className='element-wrapper'>
                    <h5>Tipo de Juicio</h5>
                    <div>
                        <input
                            type='radio'
                            id='oral'
                            value='Oral Mercantil'
                            checked={respuestas.tipoJuicio === 'Oral Mercantil'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='oral' disabled={this.state.disabled}>Oral Mercantil</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='ejecutiva'
                            value='Ejecutiva Mercantil'
                            checked={respuestas.tipoJuicio === 'Ejecutiva Mercantil'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='ejecutiva' disabled={this.state.disabled}>Ejecutiva Mercantil</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Acuerdo</h5>
                    <DateSelect date={this.state.respuestas.fechaAcuerdo} onChange={this.handleFechaChange.bind(this, 'fechaAcuerdo')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Publicación</h5>
                    <DateSelect date={this.state.respuestas.fechaPublicacion} onChange={this.handleFechaChange.bind(this, 'fechaPublicacion')} />
                </div>

                {this.renderResultadoSelect()}
                {this.renderTextInputs()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderResultadoSelect: function () {
        if (this.state.respuestas.tipoJuicio !== 'Oral Mercantil') {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5>Resultado de Emplazamiento</h5>
                <select value={options[this.state.respuestas.resultado]} onChange={this.handleSelectChange} disabled={this.state.disabled}>
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
        if (this.state.respuestas.tipoJuicio !== 'Ejecutiva Mercantil') {
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
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        var tipoJuicio = event.target.value;

        respuestas.tipoJuicio = tipoJuicio;

        if (tipoJuicio === 'Ejecutiva Mercantil') {
            respuestas.cita = {fecha: moment()};
        } else if (respuestas.cita) {
            delete respuestas.cita;
        }

        this.setState({respuestas: respuestas});
    },
    handleCitaChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas.cita[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (key, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = date.clone();

        this.setState(state);
    },
    handleHoraChange: function (time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.hora = time;

        this.setState(state);
    },
    handleCitaFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.cita.fecha = date.clone();

        this.setState(state);
    },
    handleSelectChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.resultado = options[event.target.value];
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaAdmitida;
