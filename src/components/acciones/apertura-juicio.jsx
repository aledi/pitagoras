'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// AperturaJuicio
// -----------------------------------------------------------------------------------------------

var AperturaJuicio = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 3,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {tipoJuicio: 'Oral Mercantil'}
        };
    },
    render: function () {
        return (
            <div className='apertura-juicio accion-form'>
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='Oral Mercantil'
                        checked={this.state.respuestas.tipoJuicio === 'Oral Mercantil'}
                        onChange={this.handleChange} />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='Ejecutiva Mercantil'
                        checked={this.state.respuestas.tipoJuicio === 'Ejecutiva Mercantil'}
                        onChange={this.handleChange} />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.tipoJuicio = event.target.value;
        this.setState({respuestas: respuestas});
    }
});

module.exports = AperturaJuicio;
