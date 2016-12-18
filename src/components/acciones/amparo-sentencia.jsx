'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Amparo vs Sentencia
// -----------------------------------------------------------------------------------------------

var AmparoSentencia = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 17,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                promovido: 'GMF',
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
            <div className='acuerdo-demanda accion-form'>
                <div className='element-wrapper'>
                    <h5>Promovido por</h5>
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
                        <label htmlFor='confirma' disabled={this.state.disabled}>Demandado</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='tercero'
                            value='Tercero'
                            checked={respuestas.promovido === 'Tercero'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='confirma' disabled={this.state.disabled}>Tercero</label>
                    </div>
                </div>
                {this.renderInput()}
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
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        var invalidFields = this.state.invalidFields;
        respuestas.tercero = event.target.value;
        invalidFields.tercero = false;

        this.setState({respuestas: respuestas, invalidFields: invalidFields});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.promovido = event.target.value;

        this.setState({respuestas: respuestas});
    }
});

module.exports = AmparoSentencia;
