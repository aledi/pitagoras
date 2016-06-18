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
        return {showingFullDetails: false};
    },
    render: function () {
        if (!this.props.contrato) {
            return (<div></div>);
        }

        var contrato = this.props.contrato;

        return (
            <div className='contrato'>
                <p className='go-back' onClick={this.goBack}>Volver a Contratos</p>
                <p className='go-back' onClick={this.showFullDetails}>{'Mostrar' + (this.state.showingFullDetails ? ' resumen' : ' todos los detalles')}</p>

                    <div className='contrato-detalles'>
                        <button type='button' onClick={this.handle}>Editar Contrato</button>
                        <div className='contrato-detalles-column'>
                            <p>Detalles del Contrato</p>
                            <div>
                                <span className='title'>Número de Contrato:</span>
                                <span className='value'>{contrato.numeroContrato}</span>
                            </div>
                            {this.renderFullContratoDetails()}
                        </div>
                        <div className='contrato-detalles-column'>
                            <p>Cliente</p>
                            <div>
                                <span className='title'>Nombre:</span>
                                <span className='value'>{contrato.cliente.formattedValues.nombre}</span>
                            </div>
                            {this.renderFullClienteDetails()}
                        </div>
                    </div>

                <p>Acciones Disponibles</p>
                <ul>
                    <li onClick={this.showAccion.bind(this, <Visita contrato={this.props.contrato} />)}>Visita</li>
                    <li onClick={this.showAccion.bind(this, <AltaDocumentos contrato={this.props.contrato} />)}>Alta de documentos</li>
                    <li onClick={this.showAccion.bind(this, <AperturaJuicio contrato={this.props.contrato} />)}>Apertura de juicio</li>
                    <li onClick={this.showAccion.bind(this, <PresentacionDemanda contrato={this.props.contrato} />)}>Presentación de demanda</li>
                    <li onClick={this.showAccion.bind(this, <AcuerdoDemanda contrato={this.props.contrato} />)}>Acuerdo de demanda</li>
                    <li onClick={this.showAccion.bind(this, <DemandaDesechada contrato={this.props.contrato} />)}>Demanda desechada</li>
                    <li onClick={this.showAccion.bind(this, <RecoleccionDocumentos contrato={this.props.contrato} />)}>Recolección de documentos</li>
                    <li onClick={this.showAccion.bind(this, <DemandaPrevenida contrato={this.props.contrato} />)}>Demanda prevenida</li>
                    <li onClick={this.showAccion.bind(this, <DemandaAdmitida contrato={this.props.contrato} />)}>Demanda admitida</li>
                    <li onClick={this.showAccion.bind(this, <DiligenciaEmbargo contrato={this.props.contrato} />)}>Diligencia de embargo</li>
                    <li onClick={this.showAccion.bind(this, <Emplazamiento contrato={this.props.contrato} />)}>Emplazamiento</li>
                    <li onClick={this.showAccion.bind(this, <Desahogo contrato={this.props.contrato} />)}>Desahogo / Cierre</li>
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
    renderFullContratoDetails: function () {
        if (!this.state.showingFullDetails) {
            return;
        }

        var contrato = this.props.contrato;

        return (
            <div>
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
            </div>
        );
    },
    renderFullClienteDetails: function () {
        if (!this.state.showingFullDetails) {
            return;
        }

        var contrato = this.props.contrato;
        return (
            <div>
                <div>
                    <span className='title'>Domicilio:</span>
                    <span className='value'>{contrato.cliente.formattedValues.domicilio}</span>
                </div>
                {this.renderTelefonos()}
                {this.renderReferencias()}
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
        this.setState({showingFullDetails: !this.state.showingFullDetails});
    },
    goBack: function () {
        this.context.router.replace('/contratos');
    }
});

module.exports = Contrato;
