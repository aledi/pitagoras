'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var moment = require('moment');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// DemandaPrevenida
// -----------------------------------------------------------------------------------------------

var DemandaPrevenida = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 7,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                desahogar: false
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
            <div className='demanda-prevenida accion-form'>
                <div className='element-wrapper'>
                    <h5>¿Desahogar?</h5>
                    <div>
                        <input
                            type='radio'
                            id='si'
                            value={1}
                            checked={this.state.respuestas.desahogar}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='si' disabled={this.state.disabled}>Si</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='no'
                            value={0}
                            checked={!this.state.respuestas.desahogar}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='no' disabled={this.state.disabled}>No</label>
                    </div>
                </div>
                {this.renderFecha()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderFecha: function () {
        if (!this.state.respuestas.desahogar) {
            return;
        }

        return (
            <div className='element-wrapper'>
                <h5>Fecha de desahogo</h5>
                <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange} />
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        var desahogar = parseInt(event.target.value, 10) === 1;

        respuestas.desahogar = desahogar;

        if (desahogar) {
            respuestas.fecha = moment();
        } else if (respuestas.fecha) {
            delete respuestas.fecha;
        }

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fecha = date.clone();

        this.setState(state);
    }
});

module.exports = DemandaPrevenida;
