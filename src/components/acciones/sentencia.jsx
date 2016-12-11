'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Sentencia
// -----------------------------------------------------------------------------------------------

var Sentencia = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 16,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                favorable: 'Admite',
                tercero: ''
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
                        <label htmlFor='confirma' disabled={this.state.disabled}>Demandado</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='tercero'
                            value='Tercero'
                            checked={respuestas.favorable === 'Tercero'}
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
        if (this.state.respuestas.favorable !== 'Tercero') {
            return;
        }

        return (
            <input
                type='text'
                value={this.state.respuestas.tercero}
                onChange={this.handleChange.bind(this, 'tercero')}
                disabled={this.state.disabled} />
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.favorable = event.target.value;

        this.setState({respuestas: respuestas});
    }
});

module.exports = Sentencia;
