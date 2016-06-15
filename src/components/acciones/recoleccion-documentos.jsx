'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// RecoleccionDocumentos
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentos = React.createClass({
    render: function () {
        return (
            <div className='recoleccion-documentos'>
                <div>
                    <p>¿Documentos recogidos?</p>
                    <input type='radio' id='documentosRecogidos' />
                    <label htmlFor='documentosRecogidos'>Sí</label>
                    <input type='radio' id='documentosNoRecogidos' />
                    <label htmlFor='documentosNoRecogidos'>No</label>
                </div>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentos;
