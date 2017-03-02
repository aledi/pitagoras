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
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 2,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                numeroInterno: lastAccion ? lastAccion.respuestas.numeroInterno : '',
                fecha: lastAccion ? lastAccion.respuestas.fecha : null
            },
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
                <div className='element-wrapper'>
                    <h5>Número Interno</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.numeroInterno}
                        onChange={this.handleChange.bind(this, 'numeroInterno')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Recepción</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
                </div>

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
