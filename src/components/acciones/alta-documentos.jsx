'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

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
        return (
            <div className='alta-documentos accion-form'>
                <label className='text-label'>Número Interno</label>
                <input
                    type='text'
                    value={this.state.respuestas.numeroInterno}
                    onChange={this.handleChange.bind(this, 'numeroInterno')}
                    disabled={this.state.disabled} />
                <label className='text-label'>Fecha de Recepción</label>
                <input
                    type='text'
                    value={this.state.respuestas.fechaRecepcion}
                    onChange={this.handleChange.bind(this, 'fechaRecepcion')}
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

module.exports = AltaDocumentos;
