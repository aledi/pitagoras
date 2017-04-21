'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// Extrajudicial
// -----------------------------------------------------------------------------------------------

var Extrajudicial = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        var state = {
            tipo: 12,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                fechaSeguimiento: null
            },
            disabled: false
        };

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='emplazamiento accion-form'>
                <div className='element-wrapper'>
                    <h5>Fecha de Seguimiento</h5>
                    <DateSelect date={this.state.respuestas.fechaSeguimiento} onChange={this.handleFechaChange} />
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fechaSeguimiento = date ? date.clone() : null;

        this.setState(state);
    }
});

module.exports = Extrajudicial;
