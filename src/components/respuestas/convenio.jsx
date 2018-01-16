'use strict';

var React = require('react');

var Convenio = React.createClass({
    render: function () {
        return (
            <div className='respuestas-wrapper'>
                <div>
                    <span className='bold'>Convenio: </span>
                    <span>{this.props.accion.respuestas.convenio}</span>
                </div>
            </div>
        );
    }
});

module.exports = Convenio;
