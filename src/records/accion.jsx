'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var Parse = require('parse');
var moment = require('moment');

var ContratoObject = Parse.Object.extend('Contrato');
var ContratoRecord = require('./contrato');

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
    12: 'Extrajudicial'
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

        if (accion.respuestas.fecha) {
            accion.respuestas.fecha = accion.respuestas.fecha.toDate();
        }

        if (accion.respuestas.cita && accion.respuestas.cita.fecha) {
            accion.respuestas.cita.fecha = accion.respuestas.cita.fecha.toDate();
        }

        if (accion.respuestas.fechaAcuerdo) {
            accion.respuestas.fechaAcuerdo = accion.respuestas.fechaAcuerdo.toDate();
        }

        if (accion.respuestas.fechaPublicacion) {
            accion.respuestas.fechaPublicacion = accion.respuestas.fechaPublicacion.toDate();
        }

        if (accion.respuestas.fechaPresentacion) {
            accion.respuestas.fechaPresentacion = accion.respuestas.fechaPresentacion.toDate();
        }

        if (accion.respuestas.fechaResolucion) {
            accion.respuestas.fechaResolucion = accion.respuestas.fechaResolucion.toDate();
        }

        var contrato = accion.contrato.toEditable();

        // -----------------------------------------------------------------------------------------------
        // Notificaciones
        // -----------------------------------------------------------------------------------------------

        // Notification for Demanda Desechada & Recolección de documentos
        if ((accion.tipo === 6 && accion.respuestas.regresaDocumentos) || (accion.tipo === 7 && !accion.respuestas.recogeDocumentos)) {
            contrato.notificacion = {
                tipo: 1,
                numeroContrato: contrato.numeroContrato,
                contratoId: contrato.id,
                fecha: accion.respuestas.fecha,
                horario: accion.respuestas.horario
            };
        }

        // Notification for Demanda Prevenida
        if (accion.tipo === 8 && accion.respuestas.desahogar) {
            contrato.notificacion = {
                tipo: 2,
                numeroContrato: contrato.numeroContrato,
                contratoId: contrato.id,
                fecha: accion.respuestas.fecha
            };
        }

        // Notification for Demanda Admitida & Diligencia de Embargo
        if ((accion.tipo === 10 && accion.respuestas.tipoJuicio === 'Ejecutiva Mercantil') || (accion.tipo === 11 && accion.respuestas.resultado === 'Se dejó citatorio')) {
            contrato.notificacion = {
                tipo: 3,
                numeroContrato: contrato.numeroContrato,
                contratoId: contrato.id,
                cita: accion.respuestas.cita
            };
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

        if (accion.tipo === 12) {
            contrato.reporte.extrajudicial.push({
                // TODO creador
                comentarios: accion.comentarios,
                fecha: moment().toDate()
            });
        }

        contrato.reporte.etapaActual = accion.tipo;

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
