'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// DiligenciaEmbargo
// -----------------------------------------------------------------------------------------------

var options = [
    'Se dejó citatorio',
    'No encontró el domicilio',
    'El domicilio es incorrecto',
    'La persona no vive ahí',
    'No abre nadie en el domicilio',
    'Fallecimiento',
    'Se realizó exitosamente'
];

var DiligenciaEmbargo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 10,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                resultado: 'Se dejó citatorio',
                cita: {}
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
            <div className='diligencia-embargo accion-form'>
                <select value={options[this.state.respuestas.resultado]} onChange={this.handleChange} disabled={this.state.disabled}>
                    {this.renderOptions()}
                </select>
                {this.renderCitatorio()}
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderCitatorio: function () {
        if (this.state.respuestas.resultado !== 'Se dejó citatorio') {
            return;
        }

        return (
            <div>
                <p>Citatorio</p>
                    <div>
                        <label className='text-label'>Fecha de cita</label>
                        <DateSelect date={this.state.respuestas.cita.fecha} onChange={this.handleCitaFechaChange} />
                    </div>
                    <div>
                        <label className='text-label'>Lugar</label>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.lugar}
                            onChange={this.handleCitaChange.bind(this, 'lugar')}
                            disabled={this.state.disabled} />
                    </div>
                    <div>
                        <label className='text-label'>Nombre del actuario</label>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.nombreActuario}
                            onChange={this.handleCitaChange.bind(this, 'nombreActuario')}
                            disabled={this.state.disabled} />
                    </div>
                    <div>
                        <label className='text-label'>Teléfono del actuario</label>
                        <input
                            type='text'
                            value={this.state.respuestas.cita.telefonoActuario}
                            onChange={this.handleCitaChange.bind(this, 'telefonoActuario')}
                            disabled={this.state.disabled} />
                    </div>
            </div>
        );
    },
    renderOptions: function () {
        return (options.map(function (option, index) {
            return (<option key={index} value={index}>{option}</option>);
        }));
    },
    handleCitaChange: function (propertyName, event) {
        var respuestas = this.state.respuestas;
        respuestas.cita[propertyName] = event.target.value;
        this.setState({respuestas: respuestas});
    },
    handleChange: function (event) {
        var respuestas = this.state.respuestas;
        respuestas.resultado = options[event.target.value];
        this.setState({respuestas: respuestas});
    },
    handleCitaFechaChange: function (date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas.cita.fecha = date.clone();

        this.setState(state);
    }
});

module.exports = DiligenciaEmbargo;
