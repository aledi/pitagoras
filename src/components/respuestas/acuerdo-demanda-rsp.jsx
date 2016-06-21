'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Acuerdo Demanda Respuestas
// -----------------------------------------------------------------------------------------------

var AcuerdoDemandaRespuestas = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <span className='bold'>Resultado del acuerdo: </span>
                <span>{this.props.accion.respuestas.resultadoAcuerdo}</span>
            </div>
        );
    }
});

module.exports = AcuerdoDemandaRespuestas;
