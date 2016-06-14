'use strict';

require('./contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var Visita = require('src/components/acciones/visita');
var AltaDocumentos = require('src/components/acciones/alta-documentos');
var AperturaJuicio = require('src/components/acciones/apertura-juicio');
var PresentacionDemanda = require('src/components/acciones/presentacion-demanda');
var AcuerdoDemanda = require('src/components/acciones/acuerdo-demanda');
var DemandaDesechada = require('src/components/acciones/demanda-desechada');
var RecoleccionDocumentos = require('src/components/acciones/recoleccion-documentos');
var DemandaPrevenida = require('src/components/acciones/demanda-prevenida');
var DemandaAdmitida = require('src/components/acciones/demanda-admitida');
var DiligenciaEmbargo = require('src/components/acciones/diligencia-embargo');
var Emplazamiento = require('src/components/acciones/emplazamiento');
var Desahogo = require('src/components/acciones/desahogo');

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
                    <li onClick={this.showAccion.bind(this, <Visita />)}>Visita</li>
                    <li onClick={this.showAccion.bind(this, <AltaDocumentos />)}>Alta de documentos</li>
                    <li onClick={this.showAccion.bind(this, <AperturaJuicio />)}>Apertura de juicio</li>
                    <li onClick={this.showAccion.bind(this, <PresentacionDemanda />)}>Presentación de demanda</li>
                    <li onClick={this.showAccion.bind(this, <AcuerdoDemanda />)}>Acuerdo de demanda</li>
                    <li onClick={this.showAccion.bind(this, <DemandaDesechada />)}>Demanda desechada</li>
                    <li onClick={this.showAccion.bind(this, <RecoleccionDocumentos />)}>Recolección de documentos</li>
                    <li onClick={this.showAccion.bind(this, <DemandaPrevenida />)}>Demanda prevenida</li>
                    <li onClick={this.showAccion.bind(this, <DemandaAdmitida />)}>Demanda admitida</li>
                    <li onClick={this.showAccion.bind(this, <DiligenciaEmbargo />)}>Diligencia de embargo</li>
                    <li onClick={this.showAccion.bind(this, <Emplazamiento />)}>Emplazamiento</li>
                    <li onClick={this.showAccion.bind(this, <Desahogo />)}>Desahogo / Cierre</li>
                </ul>

                {this.renderAccion()}
            </div>
        );
    },
    renderAccion: function () {
        if (!this.state.selectedAccion) {
            return;
        }

        return (this.state.selectedAccion);
    },
    showAccion: function (accion) {
        this.setState({selectedAccion: accion});
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
                    <span className='value'>{contrato.cliente.formattedValues.nombre}</span>
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
