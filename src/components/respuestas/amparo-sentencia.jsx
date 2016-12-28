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
        var juicioEjecutiva = !!this.props.accion.respuestas.favorable;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>{juicioEjecutiva ? 'Favorable a: ' : 'Promovido por: '}</span>
                    <span>{juicioEjecutiva ? this.props.accion.respuestas.favorable : this.props.accion.respuestas.promovido}</span>
                </div>
            </div>
        );
    }
});

module.exports = AmparoSentencia;
