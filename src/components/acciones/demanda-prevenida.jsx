'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DemandaPrevenida
// -----------------------------------------------------------------------------------------------

var DemandaPrevenida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 7,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {desahogar: false},
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
            <div className='demanda-prevenida accion-form'>
                <p>¿Desahogar?</p>
                <div>
                    <input
                        type='radio'
                        id='si'
                        value={1}
                        checked={this.state.respuestas.desahogar}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='no'
                        value={0}
                        checked={!this.state.respuestas.desahogar}
                        onChange={this.handleChange}
                        disabled={this.state.disabled} />
                    <label htmlFor='no' disabled={this.state.disabled}>No</label>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.desahogar = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    }
});

module.exports = DemandaPrevenida;
