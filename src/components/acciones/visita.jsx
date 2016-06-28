'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Visita
// -----------------------------------------------------------------------------------------------

var Visita = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 1,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                domicilioUbicado: false,
                clienteUbicado: false,
                datosDeContacto: null
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
            <div className='visita accion-form'>
                <div className='element-wrapper'>
                    <h5>¿Encontró el domicilio?</h5>
                    <div>
                        <input
                            type='radio'
                            id='domicilioUbicado'
                            value={1}
                            checked={this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')}
                            disabled={this.state.disabled} />
                        <label htmlFor='domicilioUbicado' disabled={this.state.disabled}>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='domicilioNoUbicado'
                            value={0}
                            checked={!this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')}
                            disabled={this.state.disabled} />
                        <label htmlFor='domicilioNoUbicado' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                {this.renderCliente()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderCliente: function () {
        if (!this.state.respuestas.domicilioUbicado) {
            return;
        }

        return (
            <div >
                <div className='element-wrapper'>
                    <h5>¿Ubicó al cliente?</h5>
                    <div>
                        <input
                            type='radio'
                            id='clienteUbicado'
                            value={1}
                            checked={this.state.respuestas.clienteUbicado}
                            onChange={this.handleRadioChange.bind(this, 'clienteUbicado')}
                            disabled={this.state.disabled} />
                        <label htmlFor='clienteUbicado' disabled={this.state.disabled}>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='clienteNoUbicado'
                            value={0}
                            checked={!this.state.respuestas.clienteUbicado}
                            onChange={this.handleRadioChange.bind(this, 'clienteUbicado')}
                            disabled={this.state.disabled} />
                        <label htmlFor='clienteNoUbicado' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5>Datos del Contacto</h5>
                    <h5 className='text-label'>¿Con quién dejó el comunicado?</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.datosDeContacto}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                </div>
            </div>
        );
    },
    handleRadioChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.datosDeContacto = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = Visita;
