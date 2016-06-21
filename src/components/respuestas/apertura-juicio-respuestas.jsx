'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Apertura Juicio Respuestas
// -----------------------------------------------------------------------------------------------

var AperturaJuicioRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Tipo de Juicio: </span>
                <span>{this.props.accion.respuestas.tipoJuicio}</span>
            </div>
        );
    }
});

module.exports = AperturaJuicioRespuestas;
