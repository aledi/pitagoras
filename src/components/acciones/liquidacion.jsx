'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Liquidacion
// -----------------------------------------------------------------------------------------------

var Liquidacion = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;
        var state = {
            tipo: 22,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                liquidacion: lastAccion ? lastAccion.respuestas.liquidacion : 'Parcial'
            },
            disabled: false
        };

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='liquidacion accion-form'>
                <div className='element-wrapper'>
                    <div>
                        <input
                            type='radio'
                            id='parcial'
                            checked={this.state.respuestas.regresaDocumentos}
                            value='parcial'
                            onChange={this.handleChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='parcial' disabled={this.state.disabled}>Parcial</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='total'
                            checked={!this.state.respuestas.regresaDocumentos}
                            value='total'
                            onChange={this.handleChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='total' disabled={this.state.disabled}>Total</label>
                    </div>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        var liquidacion = event.target.value;

        respuestas.liquidacion = liquidacion;

        this.setState({respuestas: respuestas});
    }
});

module.exports = Liquidacion;
