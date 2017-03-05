'use strict';

require('./contrato-detalle.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var classNames = require('classnames');
var moment = require('moment');

var AccionRecord = require('src/records/accion');
var ContratosActions = require('src/actions/contratos-actions');
var ContratoRecord = require('src/records/contrato');

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
var FechaSentencia = require('src/components/acciones/fecha-sentencia'); // 15
var Sentencia = require('src/components/acciones/sentencia'); // 16
var AmparoSentencia = require('src/components/acciones/amparo-sentencia'); // 17
var ResolucionAmparoSentencia = require('src/components/acciones/resolucion-amparo-sentencia'); // 18
var Apelacion = require('src/components/acciones/apelacion'); // 19
var SentenciaApelacion = require('src/components/acciones/sentencia-apelacion'); // 20
var FechaAudienciaPruebas = require('src/components/acciones/fecha-audiencia-pruebas'); // 21

// -----------------------------------------------------------------------------------------------
// Contrato
// -----------------------------------------------------------------------------------------------

var ContratoDetalle = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        var state = this.getState(this.props);
        state.selectedAccion = null;

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
                {
                    id: 1,
                    component: <Visita contrato={props.contrato} disabled={props.savingAccion} key='visita' />
                },
                {
                    id: 2,
                    component: <AltaDocumentos contrato={props.contrato} disabled={props.savingAccion} key='altaDocumentos' />
                },
                {
                    id: 3,
                    component: <PresentacionDemanda contrato={props.contrato} disabled={props.savingAccion} key='presentacionDemanda' />
                },
                {
                    id: 4,
                    component: <AcuerdoDemanda contrato={props.contrato} disabled={props.savingAccion} key='acuerdoDemanda' />
                },
                {
                    id: 5,
                    component: <Amparo contrato={props.contrato} disabled={props.savingAccion} key='amparo' />
                },
                {
                    id: 6,
                    component: <DemandaDesechada contrato={props.contrato} disabled={props.savingAccion} key='demandaDesechada' />
                },
                {
                    id: 7,
                    component: <RecoleccionDocumentos contrato={props.contrato} disabled={props.savingAccion} key='recoleccionDocumentos' />
                },
                {
                    id: 8,
                    component: <DemandaPrevenida contrato={props.contrato} disabled={props.savingAccion} key='demandaPrevenida' />
                },
                {
                    id: 9,
                    component: <Desahogo contrato={props.contrato} disabled={props.savingAccion} key='desahogo' />
                },
                {
                    id: 10,
                    component: <DemandaAdmitida contrato={props.contrato} disabled={props.savingAccion} key='demandaAdmitida' />
                },
                {
                    id: 11,
                    component: <DiligenciaEmbargo contrato={props.contrato} disabled={props.savingAccion} key='diligenciaEmbargo' />
                },
                {
                    id: 12,
                    component: <Extrajudicial contrato={props.contrato} disabled={props.savingAccion} key='extrajudicial' />
                }
            ];

            if (props.contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.ORAL) {
                accionesComponents.push(
                    {
                        id: 13,
                        component: <FechaAudienciaPrevia contrato={props.contrato} disabled={props.savingAccion} key='fechaAudienciaPrevia' />
                    },
                    {
                        id: 14,
                        component: <FechaAudienciaPrueba contrato={props.contrato} disabled={props.savingAccion} key='fechaAudienciaPrueba' />
                    },
                    {
                        id: 15,
                        component: <FechaSentencia contrato={props.contrato} disabled={props.savingAccion} key='fechaSentencia' />
                    },
                    {
                        id: 16,
                        component: <Sentencia contrato={props.contrato} disabled={props.savingAccion} key='sentencia' />
                    },
                    {
                        id: 17,
                        component: <AmparoSentencia contrato={props.contrato} disabled={props.savingAccion} key='amparoSentencia' />
                    },
                    {
                        id: 18,
                        component: <ResolucionAmparoSentencia contrato={props.contrato} disabled={props.savingAccion} key='resolucionAmparoSentencia' />
                    }
                );
            }

            if (props.contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA) {
                accionesComponents.push(
                    {
                        id: 21,
                        component: <FechaAudienciaPruebas contrato={props.contrato} disabled={props.savingAccion} key='fechaAudienciaPruebas' />
                    },
                    {
                        id: 16,
                        component: <Sentencia contrato={props.contrato} disabled={props.savingAccion} key='sentencia' />
                    },
                    {
                        id: 19,
                        component: <Apelacion contrato={props.contrato} disabled={props.savingAccion} key='apelacion' />
                    },
                    {
                        id: 20,
                        component: <SentenciaApelacion contrato={props.contrato} disabled={props.savingAccion} key='sentenciaApelacion' />
                    },
                    {
                        id: 17,
                        component: <AmparoSentencia contrato={props.contrato} disabled={props.savingAccion} key='amparoSentencia' />
                    }
                );
            }
        }

        var state = {
            contrato: props.contrato ? props.contrato.toEditable() : new ContratoRecord().toEditable(),
            editingContrato: false,
            showingFullDetails: false,
            accionesComponents: accionesComponents,
            savingAccion: props.savingAccion
        };

        if (successfulAccionSave) {
            state.selectedAccion = null;
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
                    <button type='button' className='right-button' onClick={this.toggleDetails}>{'Mostrar' + (this.state.showingFullDetails ? ' resumen' : ' todos los detalles')}</button>
                    {this.renderEditarContrato()}
                    <div className='depuracion-checkboxes'>
                        <p>Depuración</p>
                        <input
                            id='judicial'
                            type='checkbox'
                            checked={this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL || this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL}
                            onChange={this.handleDepuracionChange.bind(this, 'judicial')} />
                        <label htmlFor='judicial'>Judicial</label>
                        <input
                            id='extrajudicial'
                            type='checkbox'
                            checked={this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL || this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL}
                            onChange={this.handleDepuracionChange.bind(this, 'extrajudicial')} />
                        <label htmlFor='extrajudicial'>Extrajudicial</label>
                    </div>
                    {this.renderDepuracionInfo()}
                    <div>
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
                </div>

                <h2>Acciones</h2>
                <div className='acciones-wrapper'>
                    <ul className={classNames('acciones-list', {orange: this.props.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL || this.props.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL}, {red: this.props.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL})}>
                        {this.getAcciones()}
                    </ul>
                    <div className='accion-forma-historial'>
                        {this.renderAccion()}
                        {this.renderHistorialTitle()}
                        <AccionesHistorial acciones={this.props.accionesForContrato} />
                    </div>
                </div>
            </div>
        );
    },
    renderDepuracionInfo: function () {
        var contrato = this.state.contrato;
        if (!contrato.depuracionFecha) {
            return;
        }

        return (
            <div className='depuracion-info'>
                <p><b>Último cambio a las:</b> {moment(contrato.depuracionFecha.iso).format('D/MMM/YYYY HH:mm')}</p>
                <p><b>Último cambio por:</b> {contrato.depuracionEditor}</p>
            </div>
        );
    },
    renderEditarContrato: function () {
        if (!(Parse.User.current().get('tipo') === 3)) {
            return;
        }

        return (<button type='button' className='right-button editar-button' onClick={this.handleContratoEdit}>Editar Contrato</button>);
    },
    renderHistorialTitle: function () {
        if (this.state.selectedAccion == null) {
            return;
        }

        return (<h4>Historial de acciones</h4>);
    },
    getAcciones: function () {
        if (!this.state.accionesComponents) {
            return;
        }

        var self = this;
        return (this.state.accionesComponents.map(function (accionComponent) {
            return [
                self.renderDivider(accionComponent),
                <li key={accionComponent.id}
                    className={classNames({selected: self.state.selectedAccion === accionComponent.id})}
                    onClick={self.showAccion.bind(self, accionComponent.id)}>
                        {AccionRecord.ACCIONES_TYPES[accionComponent.id]}
                </li>
            ];
        }));
    },
    renderDivider: function (accionComponent) {
        if (accionComponent.id !== 13 && accionComponent.id !== 21) {
            return;
        }

        return (<hr />);
    },
    handleContratoEdit: function () {
        this.setState({editingContrato: !this.state.editingContrato});
    },
    renderAccion: function () {
        if (this.state.selectedAccion == null) {
            return;
        }

        var self = this;
        var accionesForTipo = [];
        this.props.accionesForContrato.forEach(function (accion, index) {
            if (accion.tipo === self.state.selectedAccion) {
                accionesForTipo.push(accion);
            }
        });

        var lastAccion = accionesForTipo[0];

        var component;
        for (var i = 0; i < this.state.accionesComponents.length; i++) {
            var accionComponent = this.state.accionesComponents[i];

            if (accionComponent.id === this.state.selectedAccion) {
                component = accionComponent.component;
                break;
            }
        }

        component = React.cloneElement(component, {lastAccion: lastAccion});

        return (
            <div>
                <button type='button' className='right-button' onClick={this.closeAccion}>Cancelar</button>
                {component}
            </div>
        );
    },
    showAccion: function (accionId) {
        this.setState({selectedAccion: accionId});
    },
    closeAccion: function () {
        this.setState({selectedAccion: null});
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
    },
    handleDepuracionJudicialChange: function (event) {
        var contrato = this.state.contrato;

        if (event.target.checked) {
            if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL) {
                contrato.depuracion = ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL;
            } else {
                contrato.depuracion = ContratoRecord.DEPURACION_TYPES.JUDICIAL;
            }
        } else if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL) {
            contrato.depuracion = null;
        } else if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL) {
            contrato.depuracion = ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL;
        }

        this.saveContrato(contrato);
    },
    handleDepuracionExtrajudicialChange: function (event) {
        var contrato = this.state.contrato;

        if (event.target.checked) {
            if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL) {
                contrato.depuracion = ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL;
            } else {
                contrato.depuracion = ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL;
            }
        } else if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.EXTRAJUDICIAL) {
            contrato.depuracion = null;
        } else if (this.state.contrato.depuracion === ContratoRecord.DEPURACION_TYPES.JUDICIAL_EXTRAJUDICIAL) {
            contrato.depuracion = ContratoRecord.DEPURACION_TYPES.JUDICIAL;
        }

        this.saveContrato(contrato);
    },
    handleDepuracionChange: function (tipo, event) {
        /* eslint-disable no-alert */

        var dialog = confirm('¿Está seguro que desea modificar la depuración del contrato?');
        if (dialog === true) {
            if (tipo === 'judicial') {
                this.handleDepuracionJudicialChange(event);
                return;
            } else {
                this.handleDepuracionExtrajudicialChange(event);
            }
        } else {
            return;
        }

        /* eslint-enable no-alert */
    },
    saveContrato: function (contrato) {
        var user = Parse.User.current();
        contrato.depuracionFecha = moment();
        contrato.depuracionEditor = user.get('nombre') + ' ' + user.get('apellido');

        this.setState({contrato: contrato});

        ContratosActions.saveContrato(contrato);
    }
});

module.exports = ContratoDetalle;
