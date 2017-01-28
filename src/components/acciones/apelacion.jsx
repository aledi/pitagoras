'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Apelacion
// -----------------------------------------------------------------------------------------------

var Apelacion = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 19,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                interpuesta: lastAccion ? lastAccion.respuestas.interpuesta : 'GMF',
                juzgado: lastAccion ? lastAccion.respuestas.juzgado : '',
                expediente: lastAccion ? lastAccion.respuestas.expediente : ''
            },
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
        var respuestas = this.state.respuestas;

        return (
            <div className='apelacion accion-form'>
                <div className='element-wrapper'>
                    <h5>Interpuesta por</h5>
                    <div>
                        <input
                            type='radio'
                            id='gmf'
                            value='GMF'
                            checked={respuestas.interpuesta === 'GMF'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='gmf' disabled={this.state.disabled}>GMF</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='demandado'
                            value='Demandado'
                            checked={respuestas.interpuesta === 'Demandado'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='demandado' disabled={this.state.disabled}>Demandado</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5>Juzgado</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.juzgado}
                        onChange={this.handleChange.bind(this, 'juzgado')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Expediente</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.expediente}
                        onChange={this.handleChange.bind(this, 'expediente')}
                        disabled={this.state.disabled} />
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.interpuesta = event.target.value;

        this.setState({respuestas: respuestas});
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = Apelacion;
