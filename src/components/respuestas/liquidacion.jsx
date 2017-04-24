'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Liquidacion
// -----------------------------------------------------------------------------------------------

var Liquidacion = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Liquidación: </span>
                    <span>{this.props.accion.respuestas.liquidacion}</span>
                </div>
            </div>
        );
    }
});

module.exports = Liquidacion;
