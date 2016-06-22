'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Emplazamiento
// -----------------------------------------------------------------------------------------------

var options = [
    'No vive en el domicilio',
    'Se niega a recibir demanda',
    'Se realizó exitosamente'
];

var Emplazamiento = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 11,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {resultado: 'No vive en el domicilio'},
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
            <div className='emplazamiento accion-form'>
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

module.exports = Emplazamiento;
