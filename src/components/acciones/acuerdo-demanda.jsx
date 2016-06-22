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
            respuestas: {resultadoAcuerdo: 'Desecha'},
            disabled: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='acuerdo-demanda accion-form'>
                <p>Resultado del acuerdo</p>
                <div>
                    <input
                        type='radio'
                        id='desecha'
                        value='Desecha'
                        checked={this.state.respuestas.resultadoAcuerdo === 'Desecha'}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='desecha'>Desecha</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='previene'
                        value='Previene'
                        checked={this.state.respuestas.resultadoAcuerdo === 'Previene'}
                        onChange={this.handleChange} />
                    <label htmlFor='previene' disabled={this.state.disabled}>Previene</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='admite'
                        value='Admite'
                        checked={this.state.respuestas.resultadoAcuerdo === 'Admite'}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='admite' disabled={this.state.disabled}>Admite</label>
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
