'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Apelacion
// -----------------------------------------------------------------------------------------------

var Apelacion = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Interpuesta por: </span>
                    <span>{this.props.accion.respuestas.interpuesta}</span>
                </div>
            </div>
        );
    }
});

module.exports = Apelacion;
