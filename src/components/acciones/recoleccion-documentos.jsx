'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// RecoleccionDocumentos
// -----------------------------------------------------------------------------------------------

var RecoleccionDocumentos = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 7,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {recogeDocumentos: false}
        };
    },
    render: function () {
        return (
            <div className='recoleccion-documentos'>
                <div>
                    <p>¿Documentos recogidos?</p>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.recogeDocumentos}
                            onChange={this.handleChange} />
                        <label htmlFor='si'>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.recogeDocumentos}
                            onChange={this.handleChange} />
                        <label htmlFor='no'>No</label>
                    </div>
                </div>
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.recogeDocumentos = parseInt(event.target.value, 10) === 1;
        this.setState({respuestas: respuestas});
    }
});

module.exports = RecoleccionDocumentos;
