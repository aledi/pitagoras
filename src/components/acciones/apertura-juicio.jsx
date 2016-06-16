'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// AperturaJuicio
// -----------------------------------------------------------------------------------------------

var AperturaJuicio = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 3,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='apertura-juicio'>
                <p>Tipo de Juicio</p>
                <div>
                    <input type='radio' id='oral' />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input type='radio' id='ejecutiva' />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = AperturaJuicio;
