'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Emplazamiento Respuestas
// -----------------------------------------------------------------------------------------------

var EmplazamientoRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Resultado: </span>
                <span>{this.props.accion.respuestas.resultado}</span>
            </div>
        );
    }
});

module.exports = EmplazamientoRespuestas;
