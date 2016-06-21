'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

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
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {resultadoAcuerdo: 'desecha'}
        };
    },
    render: function () {
        return (
            <div className='acuerdo-demanda accion-form'>
                <p>Resultado del acuerdo</p>
                <div>
                    <input
                        type='radio'
                        id='desecha'
                        value='desecha'
                        checked={this.state.respuestas.resultadoAcuerdo === 'desecha'}
                        onChange={this.handleChange} />
                    <label htmlFor='desecha'>Desecha</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='previene'
                        value='previene'
                        checked={this.state.respuestas.resultadoAcuerdo === 'previene'}
                        onChange={this.handleChange} />
                    <label htmlFor='previene'>Previene</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='admite'
                        value='admite'
                        checked={this.state.respuestas.resultadoAcuerdo === 'admite'}
                        onChange={this.handleChange} />
                    <label htmlFor='admite'>Admite</label>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.resultadoAcuerdo = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = AcuerdoDemanda;
