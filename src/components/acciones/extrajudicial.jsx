'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

var DateSelect = require('src/components/shared/date-select');
var TimeSelect = require('src/components/shared/time-select');

// -----------------------------------------------------------------------------------------------
// Extrajudicial
// -----------------------------------------------------------------------------------------------

var resultadoGestionOptions = [
    '',
    'DESCONOCEN A CLIENTE',
    'ENVÍO DE EMAIL',
    'ENVÍO DE SMS',
    'MENSAJE CON TERCERO',
    'MENSAJE EFECTIVO',
    'MENSAJE EN BUZÓN',
    'NO CONTESTA',
    'PAGO EN ACLARACIÓN',
    'PAGO HECHO',
    'PROMESA DE PAGO',
    'TERCERO SIN MENSAJE',
    'VISITA',
    'CLIENTE COLGÓ',
    'NÚMERO NO EXISTE',
    'NEGATIVA DE PAGO'
];

var modoContactoOptions = [
    '',
    'CARTA',
    'EMAIL',
    'SMS',
    'TELEFONO',
    'TELEFONO ALTERNO',
    'VISITA'
];

var personaContactadaOptions = [
    '',
    'ENCARGADO DE PAGOS',
    'FAMILIAR',
    'HERRAMIENTA DE CONTACTO',
    'SIN CONTACTO',
    'TERCERO',
    'TITULAR',
    'CO ACREDITADO',
    'REPRESENTANTE LEGAL'
];

var lugarContactoOptions = [
    '',
    'DOMICILIO SISTEMA',
    'DOMICILIO ALTERNO',
    'TRABAJO',
    'REFERENCIA'
];

var recordatorioOptions = [
    '',
    'RECORDATORIO DE PTP',
    'ACTUALIZAR DOMICILIO',
    'ACTUALIZAR TELEFONO',
    'ACTUALIZAR EMAIL'
];

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
                resultadoGestion: lastAccion ? lastAccion.respuestas.resultadoGestion : '',
                modoContacto: lastAccion ? lastAccion.respuestas.modoContacto : '',
                personaContactada: lastAccion ? lastAccion.respuestas.personaContactada : '',
                lugarContacto: lastAccion ? lastAccion.respuestas.lugarContacto : '',
                montoPromesado: lastAccion ? lastAccion.respuestas.montoPromesado : '',
                fechaSeguimiento: null,
                horaSeguimiento: null,
                recordatorio: lastAccion ? lastAccion.respuestas.recordatorio : ''
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
            <div className='emplazamiento accion-form'>
                <div className='element-wrapper'>
                    <h5>Resultado de Gestión</h5>
                    <select value={respuestas.resultadoGestion} onChange={this.handleChange.bind(this, 'resultadoGestion')} disabled={this.state.disabled}>
                        {this.renderOptions(resultadoGestionOptions)}
                    </select>
                </div>
                <div className='element-wrapper'>
                    <h5>Modo de Contacto</h5>
                    <select value={respuestas.modoContacto} onChange={this.handleChange.bind(this, 'modoContacto')} disabled={this.state.disabled}>
                        {this.renderOptions(modoContactoOptions)}
                    </select>
                </div>
                <div className='element-wrapper'>
                    <h5>Persona Contactada</h5>
                    <select value={respuestas.personaContactada} onChange={this.handleChange.bind(this, 'personaContactada')} disabled={this.state.disabled}>
                        {this.renderOptions(personaContactadaOptions)}
                    </select>
                </div>
                <div className='element-wrapper'>
                    <h5>Lugar de Contacto</h5>
                    <select value={respuestas.lugarContacto} onChange={this.handleChange.bind(this, 'lugarContacto')} disabled={this.state.disabled}>
                        {this.renderOptions(lugarContactoOptions)}
                    </select>
                </div>
                <div className='element-wrapper'>
                    <h5 className='text-label'>Monto Promesado</h5>
                    <input
                        type='text'
                        value={respuestas.montoPromesado}
                        onChange={this.handleChange.bind(this, 'montoPromesado')}
                        disabled={this.state.disabled} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de Seguimiento</h5>
                    <DateSelect date={respuestas.fechaSeguimiento} onChange={this.handleFechaChange} />
                </div>
                <div className='element-wrapper'>
                    <h5>Hora de Seguimiento</h5>
                    <TimeSelect time={respuestas.horaSeguimiento} onChange={this.handleHorarioChange} />
                </div>
                <div className='element-wrapper'>
                    <h5>Recordatorio</h5>
                    <select value={respuestas.recordatorio} onChange={this.handleChange.bind(this, 'recordatorio')} disabled={this.state.disabled}>
                        {this.renderOptions(recordatorioOptions)}
                    </select>
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderOptions: function (options) {
        return (options.map(function (option, index) {
            return (<option key={index} value={option}>{option}</option>);
        }));
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        respuestas[key] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.fechaSeguimiento = date ? date.clone() : null;
        this.setState(state);
    },
    handleHorarioChange: function (time) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.horaSeguimiento = time;
        this.setState(state);
    }
});

module.exports = Extrajudicial;
