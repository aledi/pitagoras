'use strict';

var React = require('react');

var Apelacion = React.createClass({
    render: function () {
        var respuestas = this.props.accion.respuestas;

        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Interpuesta por: </span>
                    <span>{respuestas.interpuesta}</span>
                </div>
                <div>
                    <span className='bold'>Juzgado: </span>
                    <span>{respuestas.juzgado}</span>
                </div>
                <div>
                    <span className='bold'>Expediente: </span>
                    <span>{respuestas.expediente}</span>
                </div>
            </div>
        );
    }
});

module.exports = Apelacion;
