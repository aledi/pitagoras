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
                            checked={this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')}
                            value={1} />
                        <label htmlFor='domicilioUbicado'>Sí</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='domicilioNoUbicado'
                            checked={!this.state.respuestas.domicilioUbicado}
                            onChange={this.handleRadioChange.bind(this, 'domicilioUbicado')}
                            value={0} />
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
                        <input type='radio' id='clienteUbicado' checked={this.state.respuestas.clienteUbicado} onChange={this.handleRadioChange.bind(this, 'clienteUbicado')} value={1} />
                        <label htmlFor='clienteUbicado'>Sí</label>
                    </div>
                    <div>
                        <input type='radio' id='clienteNoUbicado' checked={!this.state.respuestas.clienteUbicado} onChange={this.handleRadioChange.bind(this, 'clienteUbicado')} value={0} />
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
