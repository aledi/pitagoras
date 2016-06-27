'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

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
            respuestas: {fecha: null},
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
                <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    }
});

module.exports = AltaDocumentos;
