'use strict';

require('./contrato-detalle.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');

var ContratoForm = require('src/components/contratos/contrato-form');
var AccionesHistorial = require('src/components/acciones/acciones-historial');
var AccionRecord = require('src/records/accion');

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

var ContratoDetalle = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var accionesComponents;

        if (props.contrato) {
            accionesComponents = [
                <Visita key='visita' contrato={props.contrato} />,
                <AltaDocumentos key='altaDocumentos' contrato={props.contrato} />,
                <AperturaJuicio key='aperturaJuicio' contrato={props.contrato} />,
                <PresentacionDemanda key='presentacionDemanda' contrato={props.contrato} />,
                <AcuerdoDemanda key='acuerdoDemanda' contrato={props.contrato} />,
                <DemandaDesechada key='demandaDesechada' contrato={props.contrato} />,
                <RecoleccionDocumentos key='recoleccionDocumentos' contrato={props.contrato} />,
                <DemandaPrevenida key='demandaPrevenida' contrato={props.contrato} />,
                <DemandaAdmitida key='demandaAdmitida' contrato={props.contrato} />,
                <DiligenciaEmbargo key='diligenciaEmbargo' contrato={props.contrato} />,
                <Emplazamiento key='emplazamiento' contrato={props.contrato} />,
                <Desahogo key='desahogo' contrato={props.contrato} />
            ];
        }

        return {
            editingContrato: false,
            showingFullDetails: false,
            selectedAccionIndex: null,
            accionesComponents: accionesComponents
        };
    },
    render: function () {
        if (!this.props.contrato) {
            return (<div />);
        }

        var contrato = this.props.contrato;
        if (this.state.editingContrato) {
            return (
                <div className='contrato'>
                    <p className='go-back' onClick={this.handleContratoEdit}>Regresar a detalles</p>
                    <ContratoForm contrato={contrato} />
                </div>
            );
        }

        return (
            <div className='contrato'>
                <p className='go-back' onClick={this.goBack}>Volver a Contratos</p>
                <p className='go-back' onClick={this.showFullDetails}>{'Mostrar' + (this.state.showingFullDetails ? ' resumen' : ' todos los detalles')}</p>

                <div className='contrato-detalles'>
                    <button type='button' onClick={this.handleContratoEdit}>Editar Contrato</button>
                    <div className='contrato-detalles-column'>
                        <p>Detalles del Contrato</p>
                        <div className='detalle-wrapper'>
                            <span className='title'>Número de Contrato:</span>
                            <span className='value'>{contrato.numeroContrato}</span>
                        </div>
                        {this.renderFullContratoDetails()}
                    </div>
                    <div className='contrato-detalles-column'>
                        <p>Cliente</p>
                        <div className='detalle-wrapper'>
                            <span className='title'>Nombre:</span>
                            <span className='value'>{contrato.cliente.formattedValues.nombre}</span>
                        </div>
                        {this.renderFullClienteDetails()}
                    </div>
                </div>

                <p>Acciones Disponibles</p>
                <div className='acciones-wrapper'>
                    <ul className='acciones-list'>
                        {this.getAccionesListItems()}
                    </ul>
                    <div className='accion-forma-historial'>
                        {this.renderAccion()}
                        <AccionesHistorial acciones={this.props.acciones} />
                    </div>
                </div>
            </div>
        );
    },
    getAccionesListItems: function () {
        if (!this.state.accionesComponents) {
            return;
        }

        var self = this;
        return (this.state.accionesComponents.map(function (accionComponent, index) {
            return (<li key={index} className={classNames({selected: self.state.selectedAccionIndex === index})} onClick={self.showAccion.bind(self, index)}>{AccionRecord.ACCIONES_TYPES[index + 1]}</li>);
        }));
    },
    handleContratoEdit: function () {
        this.setState({editingContrato: !this.state.editingContrato});
    },
    renderAccion: function () {
        if (this.state.selectedAccionIndex == null) {
            return;
        }

        return (this.state.accionesComponents[this.state.selectedAccionIndex]);
    },
    showAccion: function (accionIndex) {
        this.setState({selectedAccionIndex: accionIndex});
    },
    renderFullContratoDetails: function () {
        if (!this.state.showingFullDetails) {
            return;
        }

        var contrato = this.props.contrato;

        return (
            <div>
                <div className='detalle-wrapper'>
                    <span className='title'>Fecha:</span>
                    <span className='value'>{contrato.formattedValues.fechaContrato}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Plazo:</span>
                    <span className='value'>{contrato.plazo}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Monto:</span>
                    <span className='value'>{contrato.monto}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Tasa:</span>
                    <span className='value'>{contrato.tasa}</span>
                </div>
                <p>Vehículo</p>
                <div className='detalle-wrapper'>
                    <span className='title'>Modelo:</span>
                    <span className='value'>{contrato.vehiculo.modelo}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Marca:</span>
                    <span className='value'>{contrato.vehiculo.marca}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Clase:</span>
                    <span className='value'>{contrato.vehiculo.clase}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Distribuidor:</span>
                    <span className='value'>{contrato.vehiculo.distribuidor}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Año:</span>
                    <span className='value'>{contrato.vehiculo.anio}</span>
                </div>
                <div className='detalle-wrapper'>
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
                <div className='detalle-wrapper'>
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
                <div key={index} className='detalle-wrapper'>
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
                <div key={'referencia-nombre-' + index} className='detalle-wrapper'>
                    <span className='title'>Nombre</span>
                    <span className='value'>{referencia.nombre}</span>
                </div>,
                <div key={'referencia-domicilio-' + index} className='detalle-wrapper'>
                    <span className='title'>Domicilio</span>
                    <span className='value'>{referencia.domicilio}</span>
                </div>,
                <div key={'referencia-telefono-' + index} className='detalle-wrapper'>
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

module.exports = ContratoDetalle;
