'use strict';

require('./alta-documentos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// AltaDocumentos
// -----------------------------------------------------------------------------------------------

var AltaDocumentos = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 2,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='alta-documentos'>
                <label>Número Interno</label>
                <input
                    type='text'
                    value={this.state.respuestas.numeroInterno}
                    onChange={this.handleChange.bind(this, 'numeroInterno')} />
                <label>Fecha de Recepción</label>
                <input
                    type='text'
                    value={this.state.respuestas.fechaRecepcion}
                    onChange={this.handleChange.bind(this, 'fechaRecepcion')} />
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

module.exports = AltaDocumentos;
