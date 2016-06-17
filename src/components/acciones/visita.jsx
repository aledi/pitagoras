'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

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
            contrato: this.props.contrato,
            respuestas: {
                domicilioUbicado: false,
                clienteUbicado: false,
                datosDeContacto: null
            }
        };
    },
    render: function () {
        return (
            <div className='visita'>
                <div>
                    <p>¿Encontró el domicilio?</p>
                    <div>
                        <input
                            type='radio'
                            id='domicilioUbicado'
                            value={1}
                            checked={this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')} />
                        <label htmlFor='domicilioUbicado'>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='domicilioNoUbicado'
                            value={0}
                            checked={!this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')} />
                        <label htmlFor='domicilioNoUbicado'>No</label>
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
                <div>
                    <p>¿Ubicó al cliente?</p>
                    <div>
                        <input
                            type='radio'
                            id='clienteUbicado'
                            value={1}
                            checked={this.state.respuestas.clienteUbicado}
                            onChange={this.handleRadioChange.bind(this, 'clienteUbicado')} />
                        <label htmlFor='clienteUbicado'>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='clienteNoUbicado'
                            value={0}
                            checked={!this.state.respuestas.clienteUbicado}
                            onChange={this.handleRadioChange.bind(this, 'clienteUbicado')} />
                        <label htmlFor='clienteNoUbicado'>No</label>
                    </div>
                </div>
                <div>
                    <p>Datos del Contacto</p>
                    <label>¿Con quién dejó el comunicado?</label>
                    <input type='text' value={this.state.respuestas.datosDeContacto} onChange={this.handleChange} />
                </div>
            </div>
        );
    },
    handleRadioChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.datosDeContacto = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = Visita;
