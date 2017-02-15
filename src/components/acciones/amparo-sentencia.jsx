'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var ContratoRecord = require('../../records/contrato');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// Amparo vs Sentencia
// -----------------------------------------------------------------------------------------------

var AmparoSentencia = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var juicioEjecutiva = this.props.contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA;
        var lastAccion = this.props.lastAccion;

        var state = {
            tipo: 17,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                promovido: lastAccion ? lastAccion.respuestas.promovido : 'GMF',
                tercero: lastAccion ? lastAccion.respuestas.tercero : ''
            },
            invalidFields: {
                tercero: false
            },
            disabled: false
        };

        if (lastAccion && lastAccion.respuestas.promovido !== 'GMF' && lastAccion.respuestas.promovido !== 'Demandado') {
            state.respuestas.promovido = 'Tercero';
            state.respuestas.tercero = lastAccion.respuestas.promovido;
        }

        if (juicioEjecutiva) {
            state.respuestas.promovido = lastAccion ? lastAccion.respuestas.favorable : 'GMF';
            state.respuestas.fecha = null;

            if (lastAccion && lastAccion.respuestas.favorable !== 'GMF' && lastAccion.respuestas.favorable !== 'Demandado') {
                state.respuestas.promovido = 'Tercero';
                state.respuestas.tercero = lastAccion.respuestas.favorable;
            }
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
        var respuestas = this.state.respuestas;
        var juicioEjecutiva = this.state.contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA;

        return (
            <div className='amparo-sentencia accion-form'>
                <div className='element-wrapper'>
                    <h5>{juicioEjecutiva ? 'Favorable a' : 'Promovido por'}</h5>
                    <div>
                        <input
                            type='radio'
                            id='gmf'
                            value='GMF'
                            checked={respuestas.promovido === 'GMF'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='gmf' disabled={this.state.disabled}>GMF</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='demandado'
                            value='Demandado'
                            checked={respuestas.promovido === 'Demandado'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='demandado' disabled={this.state.disabled}>Demandado</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='tercero'
                            value='Tercero'
                            checked={respuestas.promovido === 'Tercero'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='tercero' disabled={this.state.disabled}>Tercero</label>
                    </div>
                </div>
                {this.renderInput()}
                {this.renderDate()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderInput: function () {
        if (this.state.respuestas.promovido !== 'Tercero') {
            return;
        }

        return (
            <input
                type='text'
                className={classNames({invalid: this.state.invalidFields.tercero})}
                value={this.state.respuestas.tercero}
                onChange={this.handleChange.bind(this, 'tercero')}
                disabled={this.state.disabled} />
        );
    },
    renderDate: function () {
        if (this.state.contrato.tipoJuicio !== ContratoRecord.JUICIO_TYPES.EJECUTIVA) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5>Fecha</h5>
                <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
            </div>
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        var invalidFields = this.state.invalidFields;
        respuestas.tercero = event.target.value;
        invalidFields.tercero = false;

        this.setState({respuestas: respuestas, invalidFields: invalidFields});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.promovido = event.target.value;

        this.setState({respuestas: respuestas});
    }
});

module.exports = AmparoSentencia;
