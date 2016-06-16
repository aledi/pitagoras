'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaAdmitida
// -----------------------------------------------------------------------------------------------

var DemandaAdmitida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 9,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='demanda-admitida'>
                <p>Tipo de Juicio</p>
                <div>
                    <input type='radio' id='oral' />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input type='radio' id='ejecutiva' />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>

                <label>Número de Registro</label>
                <input type='text' />
                <label>Juzgado</label>
                <input type='text' />
                <label>Fecha de Presentación</label>
                <input type='text' />
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = DemandaAdmitida;
