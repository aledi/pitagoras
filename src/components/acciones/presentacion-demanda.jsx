'use strict';

require('./presentacion-demanda.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// PresentacionDemanda
// -----------------------------------------------------------------------------------------------

var PresentacionDemanda = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 4,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {},
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
            <div className='presentacion-demanda accion-form'>
                <label>Número de Registro</label>
                <input
                    type='text'
                    value={respuestas.numeroRegistro}
                    onChange={this.handleChange.bind(this, 'numeroRegistro')}
                    disabled={this.state.disabled} />
                <label>Juzgado</label>
                <input
                    type='text'
                    value={respuestas.juzgado}
                    onChange={this.handleChange.bind(this, 'juzgado')}
                    disabled={this.state.disabled} />
                <label>Fecha de Presentación</label>
                <input
                    type='text'
                    value={respuestas.fechaPresentacion}
                    onChange={this.handleChange.bind(this, 'fechaPresentacion')}
                    disabled={this.state.disabled} />
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = PresentacionDemanda;
