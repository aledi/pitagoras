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
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='apertura-juicio'>
                <p>Tipo de Juicio</p>
                <div>
                    <input
                        type='radio'
                        id='oral'
                        value='oralMercantil'
                        checked={this.state.respuestas.tipoJuicio === 'oralMercantil'}
                        onChange={this.handleChange} />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='ejecutiva'
                        value='ejecutivaMercantil'
                        checked={this.state.respuestas.tipoJuicio === 'ejecutivaMercantil'}
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
