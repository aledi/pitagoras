'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var Parse = require('parse');
var moment = require('moment');

var ContratoObject = Parse.Object.extend('Contrato');
var ContratoRecord = require('./contrato');
var ContratosActions = require('src/actions/contratos-actions');

// -----------------------------------------------------------------------------------------------
// AccionRecord
// -----------------------------------------------------------------------------------------------

var ACCIONES_TYPES = {
    1: 'Visita',
    2: 'Alta de documentos',
    3: 'Presentación de demanda',
    4: 'Acuerdo de demanda',
    5: 'Amparo',
    6: 'Demanda desechada',
    7: 'Recolección de documentos',
    8: 'Demanda prevenida',
    9: 'Desahogo / Cierre',
    10: 'Demanda admitida',
    11: 'Diligencia de embargo',
    13: 'Fecha Audiencia Previa',
    14: 'Fecha Audiencia Pruebas', // Oral
    15: 'Fecha Sentencia',
    16: 'Sentencia',
    17: 'Amparo vs Sentencia',
    18: 'Resolución Amparo vs Sentencia',
    19: 'Apelación',
    20: 'Sentencia de Apelación',
    21: 'Fecha Audiencia Pruebas', // Ejecutiva
    22: 'Liquidación',
    23: 'Convenio',
    24: 'REPO'
};

var AccionRecord = Immutable.Record({
    id: null,
    tipo: null,
    comentarios: '',
    creador: null,
    contrato: null,
    respuestas: null,
    fecha: null,
    updatedAt: null,

    formattedValues: {}
});

class Accion extends AccionRecord {
    static get ACCIONES_TYPES () {
        return ACCIONES_TYPES;
    }

    static prepareForParse (accion) {
        delete accion.disabled;
        delete accion.invalidFields;

        if (accion.respuestas.fecha) {
            accion.respuestas.fecha = moment.isMoment(accion.respuestas.fecha) ? accion.respuestas.fecha.toDate() : moment(accion.respuestas.fecha.iso ? accion.respuestas.fecha.iso : accion.respuestas.fecha).toDate();
        }

        if (accion.respuestas.fecha1) {
            accion.respuestas.fecha1 = moment.isMoment(accion.respuestas.fecha1) ? accion.respuestas.fecha1.toDate() : moment(accion.respuestas.fecha1.iso ? accion.respuestas.fecha1.iso : accion.respuestas.fecha1).toDate();
        }

        if (accion.respuestas.fecha2) {
            accion.respuestas.fecha2 = moment.isMoment(accion.respuestas.fecha2) ? accion.respuestas.fecha2.toDate() : moment(accion.respuestas.fecha2.iso ? accion.respuestas.fecha2.iso : accion.respuestas.fecha2).toDate();
        }

        if (accion.respuestas.fecha3) {
            accion.respuestas.fecha3 = moment.isMoment(accion.respuestas.fecha3) ? accion.respuestas.fecha3.toDate() : moment(accion.respuestas.fecha3.iso ? accion.respuestas.fecha3.iso : accion.respuestas.fecha3).toDate();
        }

        if (accion.respuestas.fechaSubasta1) {
            accion.respuestas.fechaSubasta1 = moment.isMoment(accion.respuestas.fechaSubasta1) ? accion.respuestas.fechaSubasta1.toDate() : moment(accion.respuestas.fechaSubasta1.iso ? accion.respuestas.fechaSubasta1.iso : accion.respuestas.fechaSubasta1).toDate();
        }

        if (accion.respuestas.fechaSubasta2) {
            accion.respuestas.fechaSubasta2 = moment.isMoment(accion.respuestas.fechaSubasta2) ? accion.respuestas.fechaSubasta2.toDate() : moment(accion.respuestas.fechaSubasta2.iso ? accion.respuestas.fechaSubasta2.iso : accion.respuestas.fechaSubasta2).toDate();
        }

        if (accion.respuestas.fechaSubasta3) {
            accion.respuestas.fechaSubasta3 = moment.isMoment(accion.respuestas.fechaSubasta3) ? accion.respuestas.fechaSubasta3.toDate() : moment(accion.respuestas.fechaSubasta3.iso ? accion.respuestas.fechaSubasta3.iso : accion.respuestas.fechaSubasta3).toDate();
        }

        if (accion.respuestas.fechaSubasta4) {
            accion.respuestas.fechaSubasta4 = moment.isMoment(accion.respuestas.fechaSubasta4) ? accion.respuestas.fechaSubasta4.toDate() : moment(accion.respuestas.fechaSubasta4.iso ? accion.respuestas.fechaSubasta4.iso : accion.respuestas.fechaSubasta4).toDate();
        }

        if (accion.respuestas.fechaSubasta5) {
            accion.respuestas.fechaSubasta5 = moment.isMoment(accion.respuestas.fechaSubasta5) ? accion.respuestas.fechaSubasta5.toDate() : moment(accion.respuestas.fechaSubasta5.iso ? accion.respuestas.fechaSubasta5.iso : accion.respuestas.fechaSubasta5).toDate();
        }

        if (accion.respuestas.fechaVoBoRbu) {
            accion.respuestas.fechaVoBoRbu = moment.isMoment(accion.respuestas.fechaVoBoRbu) ? accion.respuestas.fechaVoBoRbu.toDate() : moment(accion.respuestas.fechaVoBoRbu.iso ? accion.respuestas.fechaVoBoRbu.iso : accion.respuestas.fechaVoBoRbu).toDate();
        }

        if (accion.respuestas.fechaVoBoGmf) {
            accion.respuestas.fechaVoBoGmf = moment.isMoment(accion.respuestas.fechaVoBoGmf) ? accion.respuestas.fechaVoBoGmf.toDate() : moment(accion.respuestas.fechaVoBoGmf.iso ? accion.respuestas.fechaVoBoGmf.iso : accion.respuestas.fechaVoBoGmf).toDate();
        }

        if (accion.respuestas.fechaVenta) {
            accion.respuestas.fechaVenta = moment.isMoment(accion.respuestas.fechaVenta) ? accion.respuestas.fechaVenta.toDate() : moment(accion.respuestas.fechaVenta.iso ? accion.respuestas.fechaVenta.iso : accion.respuestas.fechaVenta).toDate();
        }

        if (accion.respuestas.cita && accion.respuestas.cita.fecha) {
            accion.respuestas.cita.fecha = moment.isMoment(accion.respuestas.cita.fecha) ? accion.respuestas.cita.fecha.toDate() : moment(accion.respuestas.cita.fecha.iso ? accion.respuestas.cita.fecha.iso : accion.respuestas.cita.fecha).toDate();
        }

        if (accion.respuestas.fechaAcuerdo) {
            accion.respuestas.fechaAcuerdo = moment.isMoment(accion.respuestas.fechaAcuerdo) ? accion.respuestas.fechaAcuerdo.toDate() : moment(accion.respuestas.fechaAcuerdo.iso ? accion.respuestas.fechaAcuerdo.iso : accion.respuestas.fechaAcuerdo).toDate();
        }

        if (accion.respuestas.fechaPublicacion) {
            accion.respuestas.fechaPublicacion = moment.isMoment(accion.respuestas.fechaPublicacion) ? accion.respuestas.fechaPublicacion.toDate() : moment(accion.respuestas.fechaPublicacion.iso ? accion.respuestas.fechaPublicacion.iso : accion.respuestas.fechaPublicacion).toDate();
        }

        if (accion.respuestas.fechaPresentacion) {
            accion.respuestas.fechaPresentacion = moment.isMoment(accion.respuestas.fechaPresentacion) ? accion.respuestas.fechaPresentacion.toDate() : moment(accion.respuestas.fechaPresentacion.iso ? accion.respuestas.fechaPresentacion.iso : accion.respuestas.fechaPresentacion).toDate();
        }

        if (accion.respuestas.fechaResolucion) {
            accion.respuestas.fechaResolucion = moment.isMoment(accion.respuestas.fechaResolucion) ? accion.respuestas.fechaResolucion.toDate() : moment(accion.respuestas.fechaResolucion.iso ? accion.respuestas.fechaResolucion.iso : accion.respuestas.fechaResolucion).toDate();
        }

        var contrato = accion.contrato.toEditable();

        // -----------------------------------------------------------------------------------------------
        // Notificaciones
        // -----------------------------------------------------------------------------------------------

        // Notification for Demanda Desechada & Recolección de documentos
        if ((accion.tipo === 6 && accion.respuestas.regresaDocumentos) || (accion.tipo === 7 && !accion.respuestas.recogeDocumentos)) {
            if (accion.respuestas.fecha) {
                contrato.notificacion = {
                    tipo: 1,
                    tipoAccion: accion.tipo,
                    numeroContrato: contrato.numeroContrato,
                    contratoId: contrato.id,
                    fecha: accion.respuestas.fecha,
                    horario: accion.respuestas.horario
                };
            }
        }

        // Notification for Demanda Prevenida
        if (accion.tipo === 8 && accion.respuestas.desahogar) {
            if (accion.respuestas.fecha) {
                contrato.notificacion = {
                    tipo: 2,
                    tipoAccion: accion.tipo,
                    numeroContrato: contrato.numeroContrato,
                    contratoId: contrato.id,
                    fecha: accion.respuestas.fecha
                };
            }
        }

        // Notification for Demanda Admitida & Diligencia de Embargo
        if ((accion.tipo === 10 && accion.respuestas.tipoJuicio === 'Ejecutiva Mercantil') || (accion.tipo === 11 && accion.respuestas.resultado === 'Se dejó citatorio')) {
            if (accion.respuestas.cita.fecha) {
                contrato.notificacion = {
                    tipo: 3,
                    tipoAccion: accion.tipo,
                    numeroContrato: contrato.numeroContrato,
                    contratoId: contrato.id,
                    cita: accion.respuestas.cita
                };
            }
        }

        // Notification for 13, 14, 15, 17, 20, 21
        if (accion.tipo === 13 || accion.tipo === 14 || accion.tipo === 15 || (accion.tipo === 17 && contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA) || accion.tipo === 20 || accion.tipo === 21) {
            if (accion.respuestas.fecha) {
                contrato.notificacion = {
                    tipo: 5,
                    tipoAccion: accion.tipo,
                    numeroContrato: contrato.numeroContrato,
                    contratoId: contrato.id,
                    fecha: accion.respuestas.fecha,
                    hora: accion.respuestas.hora
                };
            }
        }

        contrato.lastAccionAt = moment();

        // -----------------------------------------------------------------------------------------------
        // Reportes
        // -----------------------------------------------------------------------------------------------

        if (accion.tipo === 1) {
            contrato.reporte.fechaVisita = moment().toDate();
            contrato.reporte.resultadoVisita = accion.respuestas.domicilioUbicado;
        }

        if (accion.tipo === 2) {
            contrato.reporte.paqueteLegal = true;
            contrato.reporte.fechaPaqueteLegal = accion.respuestas.fecha;
        }

        if (accion.tipo === 3) {
            contrato.reporte.fechaPresentacionDemanda = accion.respuestas.fecha;
            contrato.reporte.expediente = accion.respuestas.expedienteJudicial;
            contrato.reporte.juzgado = accion.respuestas.juzgado;
            contrato.reporte.tipoJuicio = accion.respuestas.tipoJuicio;
            contrato.tipoJuicio = accion.respuestas.tipoJuicio;
            contrato.juzgado = accion.respuestas.juzgado;

            if (accion.respuestas.pendiente) {
                contrato.reporte.comentarioAcuerdoPendiente = accion.respuestas.comentarioAcuerdoPendiente;
            }
        }

        if (accion.tipo === 4) {
            contrato.reporte.fechaAcuerdo = accion.respuestas.fechaAcuerdo;
        }

        if (accion.tipo === 5) {
            contrato.reporte.fechaPresentacionAmparo = accion.respuestas.fechaPresentacion;
            contrato.reporte.resolucionAmparo = accion.respuestas.resolucion;
            contrato.reporte.fechaResolucionAmparo = accion.respuestas.fechaResolucion;
        }

        if (accion.tipo === 6) {
            contrato.reporte.fechaDesechamiento = moment().toDate();
            contrato.reporte.motivoDesechamiento = accion.respuestas.motivo;

            if (accion.respuestas.regresaDocumentos) {
                contrato.reporte.horariosJuzgado = {
                    fecha: accion.respuestas.fecha,
                    horario: accion.respuestas.horario
                };
            }
        }

        if (accion.tipo === 10) {
            contrato.reporte.fechaAdmision = accion.respuestas.fechaAcuerdo;
            contrato.reporte.resultadoEmplazamiento = accion.respuestas.resultado;
        }

        if (accion.tipo === 13) {
            contrato.reporte.fechaAudienciaPrevia = accion.respuestas.fecha;
        }

        if (accion.tipo === 14) {
            contrato.reporte.fechaAudienciaPrueba = accion.respuestas.fecha;
        }

        if (accion.tipo === 15) {
            contrato.reporte.fechaSentencia = accion.respuestas.fecha;
        }

        if (accion.tipo === 16) {
            if (accion.respuestas.favorable === 'Tercero') {
                accion.respuestas.favorable = accion.respuestas.tercero;
                delete accion.respuestas.tercero;
            }

            if (contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.ORAL) {
                delete accion.respuestas.fecha;
            } else if (contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA) {
                contrato.reporte.sentencia = accion.respuestas.fecha;
            }
        }

        if (accion.tipo === 17) {
            var juicioEjecutiva = contrato.tipoJuicio === ContratoRecord.JUICIO_TYPES.EJECUTIVA;
            var key = juicioEjecutiva ? 'favorable' : 'promovido';

            if (juicioEjecutiva) {
                accion.respuestas.favorable = accion.respuestas.promovido;
                delete accion.respuestas.promovido;
            }

            if (accion.respuestas[key] === 'Tercero') {
                accion.respuestas[key] = accion.respuestas.tercero;
                delete accion.respuestas.tercero;
            }
        }

        if (accion.tipo === 18) {
            if (accion.respuestas.favorable === 'Tercero') {
                accion.respuestas.favorable = accion.respuestas.tercero;
                delete accion.respuestas.tercero;
            }

            contrato.reporte.fechaResolucionAmparoSentencia = accion.respuestas.fecha;
        }

        if (accion.tipo === 20) {
            contrato.reporte.fechaSentenciaApelacion = accion.respuestas.fecha;
        }

        if (accion.tipo === 21) {
            contrato.reporte.fechaAudienciaPruebas = accion.respuestas.fecha;
        }

        if (accion.tipo === 24) {
            if (accion.respuestas.lugarCustodia === 'Dealer') {
                accion.respuestas.lugarCustodia = accion.respuestas.lugarCustodiaText;
                delete accion.respuestas.lugarCustodiaText;
            }
        }

        contrato.reporte.etapaActual = accion.tipo;

        // Save contrato if changed tipoJuicio to show changes immediately
        if (accion.tipo === 3) {
            ContratosActions.saveContrato(contrato);
        }

        accion.contrato = new ContratoObject(ContratoRecord.prepareForParse(contrato));

        return accion;
    }

    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        definition.id = definition.id || definition.objectId;

        // Creador
        definition.creador = definition.creador;
        formattedValues.creador = definition.creador.nombre + ' ' + definition.creador.apellido;

        // Fecha
        var createdAt = moment(definition.createdAt ? new Date(definition.createdAt) : new Date());
        definition.fecha = createdAt.format('D MMMM, YYYY');

        // Contrato
        definition.contrato = definition.contrato;

        // Updated At
        definition.updatedAt = moment(definition.updatedAt ? new Date(definition.updatedAt) : new Date());

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Accion;
