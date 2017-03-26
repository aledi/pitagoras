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
// Repo
// -----------------------------------------------------------------------------------------------

var Repo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        var state = {
            tipo: 24,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                voluntario: lastAccion ? lastAccion.respuestas.voluntario : 'Voluntario',
                valorLibros: lastAccion ? lastAccion.respuestas.valorLibros : '',
                personal: lastAccion ? lastAccion.respuestas.personal : 'Personal',
                fecha: lastAccion ? lastAccion.respuestas.fecha : null,
                montoVenta: lastAccion ? lastAccion.respuestas.montoVenta : '',
                fechaVenta: lastAccion ? lastAccion.respuestas.fechaVenta : null
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
        var respuestas = this.state.respuestas;

        return (
            <div className='repo accion-form'>
                <div className='element-wrapper'>
                    <h5>Voluntario</h5>
                    <div>
                        <input
                            type='radio'
                            id='voluntario'
                            value='Voluntario'
                            checked={respuestas.voluntario === 'Voluntario'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='voluntario' disabled={this.state.disabled}>Voluntario</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='contra'
                            value='Contra Finiquito'
                            checked={respuestas.voluntario === 'Contra Finiquito'}
                            onChange={this.handleRadioChange}
                            disabled={this.state.disabled} />
                        <label htmlFor='contra' disabled={this.state.disabled}>Contra Finiquito</label>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Valor en Libros</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.valorLibros}
                        onChange={this.handleChange.bind(this, 'valorLibros')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange.bind(this, 'fecha')} />
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Monto de Venta</h5>
                    <input
                        type='text'
                        value={this.state.respuestas.montoVenta}
                        onChange={this.handleChange.bind(this, 'montoVenta')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Venta</h5>
                    <DateSelect date={this.state.respuestas.fechaVenta} onChange={this.handleFechaChange.bind(this, 'fechaVenta')} />
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    handleRadioChange: function (event) {
        var respuestas = this.state.respuestas;
        var tipoJuicio = event.target.value;

        respuestas.tipoJuicio = tipoJuicio;

        if (tipoJuicio === 'Ejecutiva Mercantil') {
            respuestas.cita = {
                fecha: null,
                hora: null
            };
        } else if (respuestas.cita) {
            delete respuestas.cita;
        }

        this.setState({respuestas: respuestas});
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (key, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[key] = date ? date.clone() : null;

        this.setState(state);
    }
});

module.exports = Repo;
