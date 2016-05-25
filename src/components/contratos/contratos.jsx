'use strict';

require('./contratos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// Contratos
// -----------------------------------------------------------------------------------------------

var Contratos = React.createClass({
    render: function () {
        return (
            <main className='contratos'>
                <h2>Contratos</h2>
            </main>
        );
    }
});

module.exports = Contratos;
