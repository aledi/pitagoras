'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Diligencia Embargo Respuestas
// -----------------------------------------------------------------------------------------------

var DiligenciaEmbargoRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Resultado: </span>
                <span>{this.props.accion.respuestas.resultado}</span>
            </div>
        );
    }
});

module.exports = DiligenciaEmbargoRespuestas;
