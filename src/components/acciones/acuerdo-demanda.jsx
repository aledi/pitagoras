'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// AcuerdoDemanda
// -----------------------------------------------------------------------------------------------

var AcuerdoDemanda = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 5,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='acuerdo-demanda'>
                <p>Resultado del acuerdo</p>
                <div>
                    <input type='radio' id='desecha' />
                    <label htmlFor='desecha'>Desecha</label>
                </div>
                <div>
                    <input type='radio' id='previene' />
                    <label htmlFor='previene'>Previene</label>
                </div>
                <div>
                    <input type='radio' id='admite' />
                    <label htmlFor='admite'>Admite</label>
                </div>
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = AcuerdoDemanda;
