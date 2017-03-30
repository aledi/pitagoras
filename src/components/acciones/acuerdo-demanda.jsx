'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');
var DateSelect = require('src/components/shared/date-select');

// -----------------------------------------------------------------------------------------------
// AcuerdoDemanda
// -----------------------------------------------------------------------------------------------

var AcuerdoDemanda = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        var lastAccion = this.props.lastAccion;

        return {
            tipo: 4,
            comentarios: lastAccion ? lastAccion.comentarios : '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {
                resultadoAcuerdo: lastAccion ? lastAccion.respuestas.resultadoAcuerdo : 'Desecha',
                fechaAcuerdo: lastAccion ? lastAccion.respuestas.fechaAcuerdo : null,
                fechaPublicacion: lastAccion ? lastAccion.respuestas.fechaPublicacion : null,
                numeroFactura: lastAccion ? lastAccion.respuestas.numeroFactura : '',
                localExhorto: lastAccion ? lastAccion.respuestas.localExhorto : 'Local',
                disposicion: lastAccion ? lastAccion.respuestas.disposicion : null,
                diligenciable: lastAccion ? lastAccion.respuestas.diligenciable : null
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
            <div className='acuerdo-demanda accion-form'>
                <div className='element-wrapper'>
                    <h5>Resultado del acuerdo</h5>
                    <div>
                        <input
                            type='radio'
                            id='desecha'
                            value='Desecha'
                            checked={this.state.respuestas.resultadoAcuerdo === 'Desecha'}
                            onChange={this.handleChange.bind(this, 'resultadoAcuerdo')}
                            disabled={this.state.disabled} />
                        <label htmlFor='desecha'>Desecha</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='previene'
                            value='Previene'
                            checked={this.state.respuestas.resultadoAcuerdo === 'Previene'}
                            onChange={this.handleChange.bind(this, 'resultadoAcuerdo')} />
                        <label htmlFor='previene' disabled={this.state.disabled}>Previene</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='admite'
                            value='Admite'
                            checked={this.state.respuestas.resultadoAcuerdo === 'Admite'}
                            onChange={this.handleChange.bind(this, 'resultadoAcuerdo')}
                            disabled={this.state.disabled} />
                        <label htmlFor='admite' disabled={this.state.disabled}>Admite</label>
                    </div>
                    {this.renderNumeroFactura()}
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de acuerdo</h5>
                    <DateSelect date={this.state.respuestas.fechaAcuerdo} onChange={this.handleFechaChange.bind(this, 'fechaAcuerdo')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Fecha de publicación</h5>
                    <DateSelect date={this.state.respuestas.fechaPublicacion} onChange={this.handleFechaChange.bind(this, 'fechaPublicacion')} />
                </div>
                <div className='element-wrapper'>
                    <h5>Local o Exhorto</h5>
                    <div>
                        <input
                            type='radio'
                            id='local'
                            value='Local'
                            checked={this.state.respuestas.localExhorto === 'Local'}
                            onChange={this.handleChange.bind(this, 'localExhorto')}
                            disabled={this.state.disabled} />
                        <label htmlFor='local'>Local</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            id='exhorto'
                            value='Exhorto'
                            checked={this.state.respuestas.localExhorto === 'Exhorto'}
                            onChange={this.handleChange.bind(this, 'localExhorto')} />
                        <label htmlFor='exhorto' disabled={this.state.disabled}>Exhorto</label>
                    </div>
                    {this.renderRadios()}
                </div>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    },
    renderNumeroFactura: function () {
        if (this.state.respuestas.resultadoAcuerdo !== 'Admite') {
            return;
        }

        return (
            <div>
                <h5 className='text-label'>Número de Factura</h5>
                <input
                    type='text'
                    value={this.state.respuestas.numeroFactura}
                    onChange={this.handleChange.bind(this, 'numeroFactura')}
                    disabled={this.state.disabled} />
            </div>
        );
    },
    renderRadios: function () {
        if (this.state.respuestas.localExhorto !== 'Exhorto') {
            return;
        }

        return (
            <div>
                <h5>Disposición</h5>
                <div>
                    <input
                        type='radio'
                        id='disposicion'
                        value='A disposición'
                        checked={this.state.respuestas.disposicion === 'A disposición'}
                        onChange={this.handleChange.bind(this, 'disposicion')}
                        disabled={this.state.disabled} />
                    <label htmlFor='disposicion'>A disposición</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='juzgado'
                        value='Envía juzgado'
                        checked={this.state.respuestas.disposicion === 'Envía juzgado'}
                        onChange={this.handleChange.bind(this, 'disposicion')} />
                    <label htmlFor='juzgado' disabled={this.state.disabled}>Envía juzgado</label>
                </div>
                {this.renderDisposicionRadios()}
            </div>
        );
    },
    renderDisposicionRadios: function () {
        if (this.state.respuestas.disposicion !== 'A disposición') {
            return;
        }

        return (
            <div>
                <h5>Diligenciable</h5>
                <div>
                    <input
                        type='radio'
                        id='diligenciable'
                        value='Diligenciable'
                        checked={this.state.respuestas.diligenciable === 'Diligenciable'}
                        onChange={this.handleChange.bind(this, 'diligenciable')}
                        disabled={this.state.disabled} />
                    <label htmlFor='diligenciable'>Diligenciable</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='jurisdiccion'
                        value='Fuera de Jurisdicción'
                        checked={this.state.respuestas.diligenciable === 'Fuera de Jurisdicción'}
                        onChange={this.handleChange.bind(this, 'diligenciable')} />
                    <label htmlFor='jurisdiccion' disabled={this.state.disabled}>Fuera de Jurisdicción</label>
                </div>
            </div>
        );
    },
    handleChange: function (key, event) {
        var respuestas = this.state.respuestas;
        var value = event.target.value;

        if (key === 'resultadoAcuerdo' && value !== 'Admite') {
            respuestas.numeroFactura = '';
        } else if (key === 'localExhorto' && value === 'Local') {
            respuestas.disposicion = null;
            respuestas.diligenciable = null;
        } else if (key === 'disposicion' && value === 'Envía juzgado') {
            respuestas.diligenciable = null;
        }

        respuestas[key] = value;

        this.setState({respuestas: respuestas});
    },
    handleFechaChange: function (fecha, date) {
        var state = {respuestas: this.state.respuestas};
        state.respuestas[fecha] = date ? date.clone() : null;

        this.setState(state);
    }
});

module.exports = AcuerdoDemanda;
