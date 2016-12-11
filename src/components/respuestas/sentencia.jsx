'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Sentencia
// -----------------------------------------------------------------------------------------------

var Sentencia = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Favorable a: </span>
                    <span>{this.props.accion.respuestas.favorable}</span>
                </div>
            </div>
        );
    }
});

module.exports = Sentencia;
