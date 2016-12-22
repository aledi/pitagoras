'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Amparo vs Sentencia
// -----------------------------------------------------------------------------------------------

var AmparoSentencia = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Promovido por: </span>
                    <span>{this.props.accion.respuestas.promovido}</span>
                </div>
            </div>
        );
    }
});

module.exports = AmparoSentencia;
