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
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 3,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                tipoJuicio: lastAccion ? lastAccion.respuestas.tipoJuicio : 'Oral Mercantil',
                numeroRegistro: lastAccion ? lastAccion.respuestas.numeroRegistro : '',
                juzgado: lastAccion ? lastAccion.respuestas.juzgado : '',
                expedienteJudicial: lastAccion ? lastAccion.respuestas.expedienteJudicial : '',
                fecha: lastAccion ? lastAccion.respuestas.fecha : null,
                pendiente: lastAccion ? lastAccion.respuestas.pendiente : false,
                comentarioAcuerdoPendiente: lastAccion ? lastAccion.respuestas.comentarioAcuerdoPendiente : ''
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
                <div className='element-wrapper'>
                    <h5>¿Pendiente?</h5>
                        <div>
                            <input
                                type='radio'
                                id='si'
                                value={1}
                                checked={respuestas.pendiente}
                                onChange={this.handleRadioChange}
                                disabled={this.state.disabled} />
                            <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                id='no'
                                value={0}
                                checked={!respuestas.pendiente}
                                onChange={this.handleRadioChange}
                                disabled={this.state.disabled} />
                            <label htmlFor='no' disabled={this.state.disabled}>No</label>
                        </div>
                    {this.renderComentarioAcuerdoPendiente()}
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderComentarioAcuerdoPendiente: function () {
        if (!this.state.respuestas.pendiente) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5 className='text-label'>Comentarios de Acuerdo Pendiente</h5>
                <textarea
                    value={this.state.respuestas.comentarioAcuerdoPendiente}
                    onChange={this.handleChange.bind(this, 'comentarioAcuerdoPendiente')}
                    disabled={this.state.disabled} />
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
        var pendiente = parseInt(event.target.value, 10) === 1;

        respuestas.pendiente = pendiente;

        if (pendiente) {
            respuestas.comentarioAcuerdoPendiente = '';
        } else {
            delete respuestas.comentarioAcuerdoPendiente;
        }

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date ? date.clone() : null;

        this.setState(state);
    }
});

module.exports = PresentacionDemanda;
