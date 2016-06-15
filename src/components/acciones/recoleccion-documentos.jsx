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
                    <div>
                        <input type='radio' id='si' />
                        <label htmlFor='si'>Si</label>
                    </div>
                    <div>
                        <input type='radio' id='no' />
                        <label htmlFor='no'>No</label>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = RecoleccionDocumentos;
