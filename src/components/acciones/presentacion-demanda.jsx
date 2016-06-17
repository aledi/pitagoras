'use strict';

require('./presentacion-demanda.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

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
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        var respuestas = this.state.respuestas;

        return (
            <div className='presentacion-demanda'>
                <label>Número de Registro</label>
                <input
                    type='text'
                    value={respuestas.numeroRegistro}
                    onChange={this.handleChange.bind(this, 'numeroRegistro')} />
                <label>Juzgado</label>
                <input
                    type='text'
                    value={respuestas.juzgado}
                    onChange={this.handleChange.bind(this, 'juzgado')} />
                <label>Fecha de Presentación</label>
                <input
                    type='text'
                    value={respuestas.fechaPresentacion}
                    onChange={this.handleChange.bind(this, 'fechaPresentacion')} />
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
