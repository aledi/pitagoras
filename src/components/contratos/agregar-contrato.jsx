'use strict';

require('./agregar-contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// Agregar Contrato
// -----------------------------------------------------------------------------------------------

var AgregarContrato = React.createClass({
    render: function () {
        return (
            <main className='agregar-contrato'>
                <h2>Agregar Contrato</h2>
            </main>
        );
    }
});

module.exports = AgregarContrato;
