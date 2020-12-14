'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var RespuestasUtils = require('./respuestas-utils');

// -----------------------------------------------------------------------------------------------
// Desahogo Respuestas
// -----------------------------------------------------------------------------------------------

var Desahogo = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>¿Desahogar?: </span>
                <span>{RespuestasUtils.formatBooleanRespuesta(this.props.accion.respuestas.desahogar)}</span>
            </div>
        );
    }
});

module.exports = Desahogo;
