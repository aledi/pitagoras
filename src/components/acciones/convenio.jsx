'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Convenio
// -----------------------------------------------------------------------------------------------

var Convenio = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;
        var state = {
            tipo: 23,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                convenio: lastAccion ? lastAccion.respuestas.convenio : 'Judicial'
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
            <div className='convenio accion-form'>
                <div className='element-wrapper'>
                    <div>
                        <input
                            type='radio'
                            id='judicial'
                            checked={this.state.respuestas.convenio === 'Judicial'}
                            value='Judicial'
                            onChange={this.handleChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='judicial' disabled={this.state.disabled}>Judicial</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='extrajudicial'
                            checked={this.state.respuestas.convenio === 'Extrajudicial'}
                            value='Extrajudicial'
                            onChange={this.handleChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='extrajudicial' disabled={this.state.disabled}>Extrajudicial</label>
                    </div>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.convenio = event.target.value;

        this.setState({respuestas: respuestas});
    }
});

module.exports = Convenio;
