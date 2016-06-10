'use strict';

require('./contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Contrato
// -----------------------------------------------------------------------------------------------

var Contrato = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {showFullDetails: false};
    },
    render: function () {
        if (!this.props.contrato) {
            return (<div></div>);
        }

        return (
            <div className='contrato'>
                <p className='go-back' onClick={this.goBack}>Volver a Contratos</p>
                <p className='go-back' onClick={this.showFullDetails}>{'Mostrar' + (this.state.showFullDetails ? ' resumen' : ' todos los detalles')}</p>
                {this.renderContrato()}

                <p>Acciones Disponibles</p>
                <ul>
                    <li>Visita</li>
                    <li>Alta de documentos</li>
                    <li>Apertura de juicio</li>
                    <li>Presentación de demanda</li>
                    <li>Acuerdo de demanda</li>
                    <li>Demanda desechada</li>
                    <li>Recolección de documentos</li>
                    <li>Demanda prevenida</li>
                    <li>Demanda admitida</li>
                    <li>Diligencia de embargo</li>
                    <li>Emplazamiento</li>
                    <li>Desahogo / Cierre</li>
                </ul>
            </div>
        );
    },
    renderContrato: function () {
        var contrato = this.props.contrato;

        if (this.state.showFullDetails) {
            return (
                <div className='contrato-detalles'>
                    <p>Detalles del Contrato</p>
                    <div>
                        <span className='title'>Número de Contrato:</span>
                        <span className='value'>{contrato.numeroContrato}</span>
                    </div>
                    <div>
                        <span className='title'>Fecha:</span>
                        <span className='value'>{contrato.formattedValues.fechaContrato}</span>
                    </div>
                    <div>
                        <span className='title'>Plazo:</span>
                        <span className='value'>{contrato.plazo}</span>
                    </div>
                    <div>
                        <span className='title'>Monto:</span>
                        <span className='value'>{contrato.monto}</span>
                    </div>
                    <div>
                        <span className='title'>Tasa:</span>
                        <span className='value'>{contrato.tasa}</span>
                    </div>
                    <p>Vehículo</p>
                    <div>
                        <span className='title'>Modelo:</span>
                        <span className='value'>{contrato.vehiculo.modelo}</span>
                    </div>
                    <div>
                        <span className='title'>Marca:</span>
                        <span className='value'>{contrato.vehiculo.marca}</span>
                    </div>
                    <div>
                        <span className='title'>Clase:</span>
                        <span className='value'>{contrato.vehiculo.clase}</span>
                    </div>
                    <div>
                        <span className='title'>Distribuidor:</span>
                        <span className='value'>{contrato.vehiculo.distribuidor}</span>
                    </div>
                    <div>
                        <span className='title'>Año:</span>
                        <span className='value'>{contrato.vehiculo.anio}</span>
                    </div>
                    <div>
                        <span className='title'>Serie:</span>
                        <span className='value'>{contrato.vehiculo.serie}</span>
                    </div>
                    <p>Cliente</p>
                    <div>
                        <span className='title'>Nombre:</span>
                        <span className='value'>{contrato.cliente.formattedValues.nombre}</span>
                    </div>
                    <div>
                        <span className='title'>Domicilio:</span>
                        <span className='value'>{contrato.cliente.formattedValues.domicilio}</span>
                    </div>
                    {this.renderTelefonos()}
                    {this.renderReferencias()}
                </div>
            );
        }

        return (
            <div className='contrato-detalles'>
                <p>Detalles del Contrato</p>
                <div>
                    <span className='title'>Número de Contrato:</span>
                    <span className='value'>{contrato.numeroContrato}</span>
                </div>
                <div>
                    <span className='title'>Cliente:</span>
                    <span className='value'>{contrato.formattedValues.cliente}</span>
                </div>
                <div>
                    <span className='title'>Monto:</span>
                    <span className='value'>{contrato.monto}</span>
                </div>
                <div>
                    <span className='title'>Plazo:</span>
                    <span className='value'>{contrato.plazo}</span>
                </div>
                <div>
                    <span className='title'>Tasa:</span>
                    <span className='value'>{contrato.tasa}</span>
                </div>
                <p>Vehículo</p>
                <div>
                    <span className='title'>Modelo:</span>
                    <span className='value'>{contrato.vehiculo.modelo}</span>
                </div>
                <div>
                    <span className='title'>Marca:</span>
                    <span className='value'>{contrato.vehiculo.marca}</span>
                </div>
                <div>
                    <span className='title'>Año:</span>
                    <span className='value'>{contrato.vehiculo.anio}</span>
                </div>
                <div>
                    <span className='title'>Distribuidor:</span>
                    <span className='value'>{contrato.vehiculo.distribuidor}</span>
                </div>
            </div>
        );
    },
    renderTelefonos: function () {
        var cliente = this.props.contrato.cliente;

        if (!cliente.telefonos.length) {
            return;
        }

        return (cliente.telefonos.map(function (telefono, index) {
            return (
                <div key={index}>
                    <span className='title'>{'Teléfono' + (index + 1) + ':'}</span>
                    <span className='value'>{telefono}</span>
                </div>
            );
        }));
    },
    renderReferenciasTitle: function () {
        var referencias = this.props.contrato.formattedValues.referencias;

        if (!referencias || !referencias.length) {
            return;
        }

        return (<p>Referencias</p>);
    },
    renderReferencias: function () {
        var referencias = this.props.contrato.formattedValues.referencias;

        if (!referencias || !referencias.length) {
            return;
        }

        var referenciasArray = [<p key='referencias-title'>Referencias</p>];

        referencias.forEach(function (referencia, index) {
            referenciasArray.push(
                <div key={'referencia-nombre-' + index}>
                    <span className='title'>Nombre</span>
                    <span className='value'>{referencia.nombre}</span>
                </div>,
                <div key={'referencia-domicilio-' + index}>
                    <span className='title'>Domicilio</span>
                    <span className='value'>{referencia.domicilio}</span>
                </div>,
                <div key={'referencia-telefono-' + index}>
                    <span className='title'>Teléfono</span>
                    <span className='value'>{referencia.telefono}</span>
                </div>
            );
        });

        return referenciasArray;
    },
    showFullDetails: function () {
        this.setState({showFullDetails: !this.state.showFullDetails});
    },
    goBack: function () {
        this.context.router.replace('/contratos');
    }
});

module.exports = Contrato;
