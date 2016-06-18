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
                <p>{'Resultado: ' + this.props.accion.respuestas.resultado}</p>
            </div>
        );
    }
});

module.exports = EmplazamientoRespuestas;
