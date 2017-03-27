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
                            onChange={this.handleRadioChange.bind(this, 'voluntario')}
                            disabled={this.state.disabled} />
                        <label htmlFor='voluntario' disabled={this.state.disabled}>Voluntario</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='contra'
                            value='Contra Finiquito'
                            checked={respuestas.voluntario === 'Contra Finiquito'}
                            onChange={this.handleRadioChange.bind(this, 'voluntario')}
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
                    <h5>Personal</h5>
                    <div>
                        <input
                            type='radio'
                            id='personal'
                            value='Personal'
                            checked={respuestas.personal === 'Personal'}
                            onChange={this.handleRadioChange.bind(this, 'personal')}
                            disabled={this.state.disabled} />
                        <label htmlFor='personal' disabled={this.state.disabled}>Personal</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='apoderado'
                            value='Apoderado'
                            checked={respuestas.personal === 'Apoderado'}
                            onChange={this.handleRadioChange.bind(this, 'personal')}
                            disabled={this.state.disabled} />
                        <label htmlFor='apoderado' disabled={this.state.disabled}>Apoderado</label>
                    </div>
                    {this.renderFechasVoBo()}
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha</h5>
                    <DateSelect date={this.state.respuestas.fecha} onChange={this.handleFechaChange.bind(this, 'fecha')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Lugar de Custodia</h5>
                    <div>
                        <input
                            type='radio'
                            id='oficina'
                            value='Oficina México'
                            checked={respuestas.lugarCustodia === 'Oficina México'}
                            onChange={this.handleRadioChange.bind(this, 'lugarCustodia')}
                            disabled={this.state.disabled} />
                        <label htmlFor='oficina' disabled={this.state.disabled}>Oficina México</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='dealer'
                            value='Dealer'
                            checked={respuestas.lugarCustodia !== 'Oficina México'}
                            onChange={this.handleRadioChange.bind(this, 'lugarCustodia')}
                            disabled={this.state.disabled} />
                        <label htmlFor='dealer' disabled={this.state.disabled}>Dealer</label>
                    </div>
                    {this.renderInput()}
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Fechas de Subasta</h5>
                    {this.renderFechaSubasta(1)}
                    {this.renderFechaSubasta(2)}
                    {this.renderFechaSubasta(3)}
                    {this.renderFechaSubasta(4)}
                    {this.renderFechaSubasta(5)}
                    {this.renderAddDateButton()}
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
    renderFechasVoBo: function () {
        if (this.state.respuestas.personal === 'Personal') {
            return;
        }

        return (
            <div>
                <div className='element-wrapper'>
                    <h5>Fecha VoBo RBU</h5>
                    <DateSelect date={this.state.respuestas.fechaVoBoRbu} onChange={this.handleFechaChange.bind(this, 'fechaVoBoRbu')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha VoBo GMF</h5>
                    <DateSelect date={this.state.respuestas.fechaVoBoGmf} onChange={this.handleFechaChange.bind(this, 'fechaVoBoGmf')} />
                </div>
            </div>
        );
    },
    renderFechaSubasta: function (num) {
        if (!this.state.respuestas['fechaSubasta' + num] && this.state.respuestas['fechaSubasta' + num] !== null) {
            return;
        }

        return (
            <div>
                <h5>{'Fecha ' + num}</h5>
                <DateSelect date={this.state.respuestas['fechaSubasta' + num]} onChange={this.handleFechaChange.bind(this, 'fechaSubasta' + num)} />
            </div>
        );
    },
    renderInput: function () {
        if (this.state.respuestas.personal === 'Oficina México') {
            return;
        }

        return (
            <input
                type='text'
                value={this.state.respuestas.lugarCustodia}
                onChange={this.handleChange.bind(this, 'lugarCustodia')}
                disabled={this.state.disabled} />
        );
    },
    renderAddDateButton: function () {
        if (this.state.respuestas.fechaSubasta1 &&
            this.state.respuestas.fechaSubasta2 &&
            this.state.respuestas.fechaSubasta3 &&
            this.state.respuestas.fechaSubasta4 &&
            this.state.respuestas.fechaSubasta5) {
            return;
        }

        return (<button type='button' className='add' onClick={this.addDate}>Agregar nueva fecha</button>);
    },
    addDate: function () {
        var respuestas = this.state.respuestas;

        if (!respuestas.fechaSubasta1) {
            respuestas.fechaSubasta1 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fechaSubasta2) {
            respuestas.fechaSubasta2 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fechaSubasta3) {
            respuestas.fechaSubasta3 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fechaSubasta4) {
            respuestas.fechaSubasta4 = null;
            this.setState({respuestas: respuestas});
        } else if (!respuestas.fechaSubasta5) {
            respuestas.fechaSubasta5 = null;
            this.setState({respuestas: respuestas});
        }
    },
    handleRadioChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;

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
