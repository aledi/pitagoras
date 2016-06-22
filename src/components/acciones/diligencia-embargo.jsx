'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// DiligenciaEmbargo
// -----------------------------------------------------------------------------------------------

var options = [
    'No encontró el domicilio',
    'El domicilio es incorrecto',
    'La persona no vive ahí',
    'No abre nadie en el domicilio',
    'Fallecimiento',
    'Se realizó exitosamente'
];

var DiligenciaEmbargo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 10,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {resultado: 'No encontró el domicilio'},
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
            <div className='diligencia-embargo accion-form'>
                <select value={options[this.state.respuestas.resultado]} onChange={this.handleChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.resultado = options[event.target.value];
        this.setState({respuestas: respuestas});
    }
});

module.exports = DiligenciaEmbargo;
