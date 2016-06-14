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
            clienteUbicado: false,
            datosDeContacto: null
        };
    },
    render: function () {
        return (
            <div className='visita'>
                    <div>
                        <p>¿Encontró el domicilio?</p>
                        <input type='radio' id='domicilioUbicado' />
                        <label htmlFor='domicilioUbicado'>Sí</label>
                        <input type='radio' id='domicilioNoUbicado' />
                        <label htmlFor='domicilioNoUbicado'>No</label>
                    </div>
                    <div>
                        <p>¿Ubicó al cliente?</p>
                        <input type='radio' id='clienteUbicado' />
                        <label htmlFor='clienteUbicado'>Sí</label>
                        <input type='radio' id='clienteNoUbicado' />
                        <label htmlFor='clienteNoUbicado'>No</label>
                    </div>
                    <div>
                        <p>Datos del Contacto</p>
                        <label>¿Con quién dejó el comunicado?</label>
                        <input type='text' />
                    </div>
            </div>
        );
    }
});

module.exports = Visita;
