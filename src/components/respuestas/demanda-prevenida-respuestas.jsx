'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Demanda Prevenida Respuestas
// -----------------------------------------------------------------------------------------------

var DemandaPrevenidaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <p>{'¿Desahogar?: ' + this.props.accion.respuestas.desahogar}</p>
            </div>
        );
    }
});

module.exports = DemandaPrevenidaRespuestas;
