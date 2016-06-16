'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Visita
// -----------------------------------------------------------------------------------------------

var Visita = React.createClass({
    getInitialState: function () {
        return {
            domicilioUbicado: false,
            clienteUbicado: true,
            datosDeContacto: null
        };
    },
    render: function () {
        return (
            <div className='visita'>
                <div>
                    <p>¿Encontró el domicilio?</p>
                    <div>
                        <input type='radio' id='domicilioUbicado' checked={this.state.domicilioUbicado} onChange={this.handleDomicilioUbicadoChange} value={1} />
                        <label htmlFor='domicilioUbicado'>Sí</label>
                    </div>
                    <div>
                        <input type='radio' id='domicilioNoUbicado' checked={!this.state.domicilioUbicado} onChange={this.handleDomicilioUbicadoChange} value={0} />
                        <label htmlFor='domicilioNoUbicado'>No</label>
                    </div>
                </div>
                {this.renderCliente()}
            </div>
        );
    },
    renderCliente: function () {
        if (!this.state.domicilioUbicado) {
            return;
        }

        return (
            <div >
                <div>
                    <p>¿Ubicó al cliente?</p>
                    <div>
                        <input type='radio' id='clienteUbicado' checked={this.state.clienteUbicado} onChange={this.handleClienteUbicadoChange} value={1} />
                        <label htmlFor='clienteUbicado'>Sí</label>
                    </div>
                    <div>
                        <input type='radio' id='clienteNoUbicado' checked={!this.state.clienteUbicado} onChange={this.handleClienteUbicadoChange} value={0} />
                        <label htmlFor='clienteNoUbicado'>No</label>
                    </div>
                </div>
                <div>
                    <p>Datos del Contacto</p>
                    <label>¿Con quién dejó el comunicado?</label>
                    <input type='text' value={this.state.datosDeContacto} onChange={this.handleHorarioChange} />
                </div>
            </div>
        );
    },
    handleDomicilioUbicadoChange: function (event) {
        this.setState({domicilioUbicado: parseInt(event.target.value, 10) === 1});
    },
    handleClienteUbicadoChange: function (event) {
        this.setState({clienteUbicado: parseInt(event.target.value, 10) === 1});
    },
    handleDatosDeContactoChange: function (event) {
        this.setState({datosDeContacto: event.target.value});
    }
});

module.exports = Visita;
