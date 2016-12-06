'use strict';

require('./contrato-detalle.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');

var AccionRecord = require('src/records/accion');

var AccionesHistorial = require('src/components/acciones/acciones-historial');
var ContratoForm = require('src/components/contratos/contrato-form');

var Visita = require('src/components/acciones/visita'); // 1
var AltaDocumentos = require('src/components/acciones/alta-documentos'); // 2
var PresentacionDemanda = require('src/components/acciones/presentacion-demanda'); // 3
var AcuerdoDemanda = require('src/components/acciones/acuerdo-demanda'); // 4
var Amparo = require('src/components/acciones/amparo'); // 5
var DemandaDesechada = require('src/components/acciones/demanda-desechada'); // 6
var RecoleccionDocumentos = require('src/components/acciones/recoleccion-documentos'); // 7
var DemandaPrevenida = require('src/components/acciones/demanda-prevenida'); // 8
var Desahogo = require('src/components/acciones/desahogo'); // 9
var DemandaAdmitida = require('src/components/acciones/demanda-admitida'); // 10
var DiligenciaEmbargo = require('src/components/acciones/diligencia-embargo'); // 11
var Extrajudicial = require('src/components/acciones/extrajudicial'); // 12
var FechaAudienciaPrevia = require('src/components/acciones/fecha-audiencia-previa'); // 13
var FechaAudienciaPrueba = require('src/components/acciones/fecha-audiencia-prueba'); // 14

// -----------------------------------------------------------------------------------------------
// Contrato
// -----------------------------------------------------------------------------------------------

var ContratoDetalle = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        var state = this.getState(this.props);
        state.selectedAccionIndex = null;

        return state;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var accionesComponents;
        var successfulAccionSave = this.state && this.state.savingAccion && !props.savingAccion && !props.saveError;

        if (props.contrato) {
            accionesComponents = [
                <Visita contrato={props.contrato} disabled={props.savingAccion} key='visita' />,
                <AltaDocumentos contrato={props.contrato} disabled={props.savingAccion} key='altaDocumentos' />,
                <PresentacionDemanda contrato={props.contrato} disabled={props.savingAccion} key='presentacionDemanda' />,
                <AcuerdoDemanda contrato={props.contrato} disabled={props.savingAccion} key='acuerdoDemanda' />,
                <Amparo contrato={props.contrato} disabled={props.savingAccion} key='amparo' />,
                <DemandaDesechada contrato={props.contrato} disabled={props.savingAccion} key='demandaDesechada' />,
                <RecoleccionDocumentos contrato={props.contrato} disabled={props.savingAccion} key='recoleccionDocumentos' />,
                <DemandaPrevenida contrato={props.contrato} disabled={props.savingAccion} key='demandaPrevenida' />,
                <Desahogo contrato={props.contrato} disabled={props.savingAccion} key='desahogo' />,
                <DemandaAdmitida contrato={props.contrato} disabled={props.savingAccion} key='demandaAdmitida' />,
                <DiligenciaEmbargo contrato={props.contrato} disabled={props.savingAccion} key='diligenciaEmbargo' />,
                <Extrajudicial contrato={props.contrato} disabled={props.savingAccion} key='extrajudicial' />,
                <FechaAudienciaPrevia contrato={props.contrato} disabled={props.savingAccion} key='fechaAudienciaPrevia' />,
                <FechaAudienciaPrueba contrato={props.contrato} disabled={props.savingAccion} key='fechaAudienciaPrueba' />,
                <FechaSentencia contrato={props.contrato} disabled={props.savingAccion} key='fechaSentencia' />
            ];
        }

        var state = {
            editingContrato: false,
            showingFullDetails: false,
            accionesComponents: accionesComponents,
            savingAccion: props.savingAccion
        };

        if (successfulAccionSave) {
            state.selectedAccionIndex = null;
        }

        return state;
    },
    render: function () {
        if (!this.props.contrato) {
            return (<div />);
        }

        var contrato = this.props.contrato;
        if (this.state.editingContrato) {
            return (
                <div className='contrato'>
                    <span className='side-button' onClick={this.handleContratoEdit}>Regresar a Detalles</span>
                    <ContratoForm contrato={contrato} />
                </div>
            );
        }

        return (
            <div className='contrato'>
                <span className='side-button' onClick={this.goBack}>Regresar a Contratos</span>

                <div className='contrato-detalles'>
                    <button type='button' className='top-right' onClick={this.toggleDetails}>{'Mostrar' + (this.state.showingFullDetails ? ' resumen' : ' todos los detalles')}</button>
                    {this.renderEditarContrato()}
                    <div className='contrato-detalles-column'>
                        <h4>Detalles del Contrato</h4>
                        <div className='detalle-wrapper'>
                            <span className='title'>Número de Contrato:</span>
                            <span className='value'>{contrato.numeroContrato}</span>
                        </div>
                        {this.renderFullContratoDetails()}
                    </div>
                    <div className='contrato-detalles-column'>
                        <h4>Cliente</h4>
                        <div className='detalle-wrapper'>
                            <span className='title'>Nombre:</span>
                            <span className='value'>{contrato.cliente.formattedValues.nombre}</span>
                        </div>
                        {this.renderFullClienteDetails()}
                    </div>
                    {this.renderVehiculoDetails()}
                </div>

                <h2>Acciones</h2>
                <div className='acciones-wrapper'>
                    <ul className='acciones-list'>
                        {this.getAcciones()}
                    </ul>
                    <div className='accion-forma-historial'>
                        {this.renderAccion()}
                        {this.renderHistorialTitle()}
                        <AccionesHistorial acciones={this.props.acciones} />
                    </div>
                </div>
            </div>
        );
    },
    renderEditarContrato: function () {
        if (!(Parse.User.current().get('tipo') === 3)) {
            return;
        }

        return (<button type='button' className='top-right editar-button' onClick={this.handleContratoEdit}>Editar Contrato</button>);
    },
    renderHistorialTitle: function () {
        if (this.state.selectedAccionIndex == null) {
            return;
        }

        return (<h4>Historial de acciones</h4>);
    },
    getAcciones: function () {
        if (!this.state.accionesComponents) {
            return;
        }

        var self = this;
        return (this.state.accionesComponents.map(function (accionComponent, index) {
            return (
                <li key={index}
                    className={classNames({selected: self.state.selectedAccionIndex === index})}
                    onClick={self.showAccion.bind(self, index)}>
                        {AccionRecord.ACCIONES_TYPES[index + 1]}
                </li>
            );
        }));
    },
    handleContratoEdit: function () {
        this.setState({editingContrato: !this.state.editingContrato});
    },
    renderAccion: function () {
        if (this.state.selectedAccionIndex == null) {
            return;
        }

        return (
            <div>
                <button type='button' className='top-right' onClick={this.closeAccion}>Cancelar</button>
                {this.state.accionesComponents[this.state.selectedAccionIndex]}
            </div>
        );
    },
    showAccion: function (accionIndex) {
        this.setState({selectedAccionIndex: accionIndex});
    },
    closeAccion: function () {
        this.setState({selectedAccionIndex: null});
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
                    <span className='title'>Tipo de Asignacion:</span>
                    <span className='value'>{contrato.tipoAsignacion}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Tipo de Contrato:</span>
                    <span className='value'>{contrato.tipoContrato}</span>
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
                <div className='detalle-wrapper'>
                    <span className='title'>Creador:</span>
                    <span className='value'>{contrato.formattedValues.creador}</span>
                </div>
                <div className='detalle-wrapper'>
                    <span className='title'>Última Edición:</span>
                    <span className='value'>{contrato.formattedValues.ultimoEditor}</span>
                </div>
            </div>
        );
    },
    renderFullClienteDetails: function () {
        if (!this.state.showingFullDetails) {
            return;
        }

        return (
            <div>
                <div className='detalle-wrapper'>
                    <span className='title'>Domicilio:</span>
                    <span className='value'>{this.props.contrato.cliente.formattedValues.domicilio}</span>
                </div>
                {this.renderTelefonos()}
                {this.renderReferencias()}
            </div>
        );
    },
    renderVehiculoDetails: function () {
        if (!this.state.showingFullDetails) {
            return;
        }

        var contrato = this.props.contrato;
        return (
            <div className='contrato-detalles-column'>
                <h4>Vehículo</h4>
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
    toggleDetails: function () {
        this.setState({showingFullDetails: !this.state.showingFullDetails});
    },
    goBack: function () {
        this.context.router.replace('/contratos');
    }
});

module.exports = ContratoDetalle;
