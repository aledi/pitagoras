'use strict';

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
            tipo: 3,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {tipoJuicio: 'Oral Mercantil'},
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
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='Oral Mercantil'
                        checked={this.state.respuestas.tipoJuicio === 'Oral Mercantil'}
                        onChange={this.handleChange.bind(this, 'tipoJuicio')}
                        disabled={this.state.disabled} />
                    <label htmlFor='oral' disabled={this.state.disabled}>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='Ejecutiva Mercantil'
                        checked={this.state.respuestas.tipoJuicio === 'Ejecutiva Mercantil'}
                        onChange={this.handleChange.bind(this, 'tipoJuicio')}
                        disabled={this.state.disabled} />
                    <label htmlFor='ejecutiva' disabled={this.state.disabled}>Ejecutiva Mercantil</label>
                </div>
                <label className='text-label'>Número de Registro</label>
                <input
                    type='text'
                    value={respuestas.numeroRegistro}
                    onChange={this.handleChange.bind(this, 'numeroRegistro')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Juzgado</label>
                <input
                    type='text'
                    value={respuestas.juzgado}
                    onChange={this.handleChange.bind(this, 'juzgado')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Fecha de Presentación</label>
                <input
                    type='text'
                    value={respuestas.fechaPresentacion}
                    onChange={this.handleChange.bind(this, 'fechaPresentacion')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Expediente Judicial</label>
                <input
                    type='text'
                    value={respuestas.expedienteJudicial}
                    onChange={this.handleChange.bind(this, 'expedienteJudicial')}
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
