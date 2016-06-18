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
                <p>{'Resultado del acuerdo: ' + this.props.accion.respuestas.resultadoAcuerdo}</p>
            </div>
        );
    }
});

module.exports = AcuerdoDemandaRespuestas;
