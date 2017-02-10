'use strict';

var Immutable = require('immutable');
var moment = require('moment');

var RespuestasUtils = require('src/components/respuestas/respuestas-utils');

// -----------------------------------------------------------------------------------------------
// ReporteRecord
// -----------------------------------------------------------------------------------------------

var ReporteRecord = Immutable.Record({
    id: null,
    numeroContrato: null,
    nombre: '',
    fechaAsignacion: null,
    tipoAsignacion: null,
    tipoContrato: null,
    depuracion: null,
    paqueteLegal: null,
    fechaPaqueteLegal: null,
    certificacionContable: null,
    fechaVisita: null,
    resultadoVisita: null,
    fechaPresentacionDemanda: null,
    expediente: '',
    juzgado: '',
    tipoJuicio: '',
    fechaAcuerdo: null,
    comentarioAcuerdoPendiente: null,
    fechaDesechamiento: null,
    motivoDesechamiento: '',
    fechaPresentacionAmparo: null,
    resolucionAmparo: null,
    fechaResolucionAmparo: null,
    horariosJuzgado: null,
    fechaAdmision: null,
    fechaAudienciaPrevia: null,
    fechaAudienciaPrueba: null,
    fechaSentencia: null,
    fechaResolucionAmparoSentencia: null,
    sentencia: null,
    fechaSentenciaApelacion: null,
    fechaAudienciaPruebas: null,
    resultadoEmplazamiento: null,
    etapaActual: null,
    extrajudicial: null,

    formattedValues: {}
});

class Reporte extends ReporteRecord {
    static prepareForParse (reporte) {
        return reporte;
    }

    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        // ID
        definition.id = definition.id || definition.objectId;

        // Numero Contrato
        definition.numeroContrato = definition.numeroContrato;

        // Nombre
        definition.nombre = definition.nombre;

        // Fecha de Asignación
        definition.fechaAsignacion = definition.fechaAsignacion ? definition.fechaAsignacion.iso : moment();
        formattedValues.fechaAsignacion = moment(definition.fechaAsignacion).format('D MMMM, YYYY');

        // Tipo Asignación
        definition.tipoAsignacion = definition.tipoAsignacion;

        // Tipo Contrato
        definition.tipoContrato = definition.tipoContrato;

        // Depuración
        definition.depuracion = definition.depuracion;

        // Paquete Legal
        definition.paqueteLegal = definition.paqueteLegal;
        formattedValues.paqueteLegal = RespuestasUtils.formatBooleanRespuesta(definition.paqueteLegal);

        // Fecha de Paquete Legal
        definition.fechaPaqueteLegal = definition.fechaPaqueteLegal;
        formattedValues.fechaPaqueteLegal = definition.fechaPaqueteLegal ? moment(definition.fechaPaqueteLegal.iso).format('D MMMM, YYYY') : null;

        // Certificacion Contable
        definition.certificacionContable = definition.certificacionContable;
        formattedValues.certificacionContable = RespuestasUtils.formatBooleanRespuesta(definition.certificacionContable);

        // Fecha de Visita
        definition.fechaVisita = definition.fechaVisita;
        formattedValues.fechaVisita = definition.fechaVisita ? moment(definition.fechaVisita.iso).format('D MMMM, YYYY') : null;

        // Resultado de Visita
        definition.resultadoVisita = definition.resultadoVisita;
        formattedValues.resultadoVisita = RespuestasUtils.formatBooleanRespuesta(definition.resultadoVisita);

        // Fecha de Presentación de Demanda
        definition.fechaPresentacionDemanda = definition.fechaPresentacionDemanda;
        formattedValues.fechaPresentacionDemanda = definition.fechaPresentacionDemanda ? moment(definition.fechaPresentacionDemanda.iso).format('D MMMM, YYYY') : null;

        // Expediente
        definition.expediente = definition.expediente;

        // Juzgado
        definition.juzgado = definition.juzgado;

        // Tipo de Juicio
        definition.tipoJuicio = definition.tipoJuicio;

        // Fecha de Acuerdo
        definition.fechaAcuerdo = definition.fechaAcuerdo;
        formattedValues.fechaAcuerdo = definition.fechaAcuerdo ? moment(definition.fechaAcuerdo.iso).format('D MMMM, YYYY') : null;

        // Comentario de Acuerdo Pendiente
        definition.comentarioAcuerdoPendiente = definition.comentarioAcuerdoPendiente;

        // Fecha de Desechamiento
        definition.fechaDesechamiento = definition.fechaDesechamiento;
        formattedValues.fechaDesechamiento = definition.fechaDesechamiento ? moment(definition.fechaDesechamiento.iso).format('D MMMM, YYYY') : null;

        // Motivo de Desechamiento
        definition.motivoDesechamiento = definition.motivoDesechamiento;

        // Fecha de Presentación Amparo
        definition.fechaPresentacionAmparo = definition.fechaPresentacionAmparo;
        formattedValues.fechaPresentacionAmparo = definition.fechaPresentacionAmparo ? moment(definition.fechaPresentacionAmparo.iso).format('D MMMM, YYYY') : null;

        // Fecha de Audiencia Previa
        definition.fechaAudienciaPrevia = definition.fechaAudienciaPrevia;
        formattedValues.fechaAudienciaPrevia = definition.fechaAudienciaPrevia ? moment(definition.fechaAudienciaPrevia.iso).format('D MMMM, YYYY') : null;

        // Fecha de Audiencia Prueba
        definition.fechaAudienciaPrueba = definition.fechaAudienciaPrueba;
        formattedValues.fechaAudienciaPrueba = definition.fechaAudienciaPrueba ? moment(definition.fechaAudienciaPrueba.iso).format('D MMMM, YYYY') : null;

        // Fecha de Sentencia
        definition.fechaSentencia = definition.fechaSentencia;
        formattedValues.fechaSentencia = definition.fechaSentencia ? moment(definition.fechaSentencia.iso).format('D MMMM, YYYY') : null;

        // Fecha de Resolución Amparo vs Sentencia
        definition.fechaResolucionAmparoSentencia = definition.fechaResolucionAmparoSentencia;
        formattedValues.fechaResolucionAmparoSentencia = definition.fechaResolucionAmparoSentencia ? moment(definition.fechaResolucionAmparoSentencia.iso).format('D MMMM, YYYY') : null;

        // Sentencia
        definition.sentencia = definition.sentencia;
        formattedValues.sentencia = definition.sentencia ? moment(definition.sentencia.iso).format('D MMMM, YYYY') : null;

        // Fecha Sentencia de Apelación
        definition.fechaSentenciaApelacion = definition.fechaSentenciaApelacion;
        formattedValues.fechaSentenciaApelacion = definition.fechaSentenciaApelacion ? moment(definition.fechaSentenciaApelacion.iso).format('D MMMM, YYYY') : null;

        // Resolución de Amparo
        definition.resolucionAmparo = definition.resolucionAmparo;

        // Fecha de Resolución Amparo
        definition.fechaResolucionAmparo = definition.fechaResolucionAmparo;
        formattedValues.fechaResolucionAmparo = definition.fechaResolucionAmparo ? moment(definition.fechaResolucionAmparo.iso).format('D MMMM, YYYY') : null;

        // Fecha de Audiencia Pruebas
        definition.fechaAudienciaPruebas = definition.fechaAudienciaPruebas;
        formattedValues.fechaAudienciaPruebas = definition.fechaAudienciaPruebas ? moment(definition.fechaAudienciaPruebas.iso).format('D MMMM, YYYY') : null;

        // Horarios de Juzgado
        definition.horariosJuzgado = definition.horariosJuzgado;
        formattedValues.horariosJuzgado = definition.horariosJuzgado ? moment(definition.horariosJuzgado.fecha.iso).format('D MMMM, YYYY') + ' de ' + definition.horariosJuzgado.horario.start + ' a ' + definition.horariosJuzgado.horario.end : null;

        // Fecha de Admisión
        definition.fechaAdmision = definition.fechaAdmision;
        formattedValues.fechaAdmision = definition.fechaAdmision ? moment(definition.fechaAdmision.iso).format('D MMMM, YYYY') : null;

        // Resultado de emplazamiento
        definition.resultadoEmplazamiento = definition.resultadoEmplazamiento;

        // Etapa Actual
        definition.etapaActual = definition.etapaActual;

        // Extrajudicial
        definition.extrajudicial = definition.extrajudicial;

        definition.formattedValues = formattedValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            numeroContrato: this.numeroContrato,
            nombre: this.nombre,
            fechaAsignacion: this.fechaAsignacion,
            tipoAsignacion: this.tipoAsignacion,
            tipoContrato: this.tipoContrato,
            depuracion: this.depuracion,
            paqueteLegal: this.paqueteLegal,
            fechaPaqueteLegal: this.fechaPaqueteLegal,
            fechaVisita: this.fechaVisita,
            resultadoVisita: this.resultadoVisita,
            fechaPresentacionDemanda: this.fechaPresentacionDemanda,
            expediente: this.expediente,
            juzgado: this.juzgado,
            tipoJuicio: this.tipoJuicio,
            fechaAcuerdo: this.fechaAcuerdo,
            comentarioAcuerdoPendiente: this.comentarioAcuerdoPendiente,
            fechaDesechamiento: this.fechaDesechamiento,
            motivoDesechamiento: this.motivoDesechamiento,
            horariosJuzgado: this.horariosJuzgado,
            fechaAdmision: this.fechaAdmision,
            resultadoEmplazamiento: this.resultadoEmplazamiento,
            etapaActual: this.etapaActual,
            extrajudicial: this.extrajudicial || []
        };
    }
}

module.exports = Reporte;
