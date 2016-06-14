'use strict';

require('./alta-documentos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// AltaDocumentos
// -----------------------------------------------------------------------------------------------

var AltaDocumentos = React.createClass({
    render: function () {
        return (
            <div className='alta-documentos'>
                <label>Número Interno</label>
                <input type='text' />
                <label>Fecha de Recepción</label>
                <input type='text' />
            </div>
        );
    }
});

module.exports = AltaDocumentos;
