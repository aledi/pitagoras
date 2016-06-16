'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaPrevenida
// -----------------------------------------------------------------------------------------------

var DemandaPrevenida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 8,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='demanda-prevenida'>
                <p>¿Desahogar?</p>
                <div>
                    <input type='radio' id='si' />
                    <label htmlFor='si'>Si</label>
                </div>
                <div>
                    <input type='radio' id='no' />
                    <label htmlFor='no'>No</label>
                </div>
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = DemandaPrevenida;
