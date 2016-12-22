'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');
var moment = require('moment');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// Resolución Amparo vs Sentencia
// -----------------------------------------------------------------------------------------------

var ResolucionAmparoSentencia = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 18,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                fecha: moment(),
                favorable: 'GMF',
                tercero: ''
            },
            invalidFields: {
                tercero: false
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
            <div className='resolucion-amparo-sentencia accion-form'>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>
                <div className='element-wrapper'>
                    <h5>Favorable a</h5>
                    <div>
                        <input
                            type='radio'
                            id='gmf'
                            value='GMF'
                            checked={respuestas.favorable === 'GMF'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='gmf' disabled={this.state.disabled}>GMF</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='demandado'
                            value='Demandado'
                            checked={respuestas.favorable === 'Demandado'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='demandado' disabled={this.state.disabled}>Demandado</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='tercero'
                            value='Tercero'
                            checked={respuestas.favorable === 'Tercero'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='tercero' disabled={this.state.disabled}>Tercero</label>
                    </div>
                </div>
                {this.renderInput()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderInput: function () {
        if (this.state.respuestas.favorable !== 'Tercero') {
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
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        var invalidFields = this.state.invalidFields;
        respuestas.tercero = event.target.value;
        invalidFields.tercero = false;

        this.setState({respuestas: respuestas, invalidFields: invalidFields});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.favorable = event.target.value;

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    }
});

module.exports = ResolucionAmparoSentencia;
