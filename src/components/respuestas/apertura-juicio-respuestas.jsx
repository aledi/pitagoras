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
                <p>{'Tipo de Juicio: ' + this.props.accion.respuestas.tipoJuicio}</p>
            </div>
        );
    }
});

module.exports = AperturaJuicioRespuestas;
