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
    numeroFactura: null,
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
    fechaDiligencia: null,
    fechaAcuerdo: null,
    comentarioAcuerdoPendiente: null,
    fechaDesechamiento: null,
    motivoDesechamiento: '',
    fechaPresentacionAmparo: null,
    resolucionAmparo: null,
    tipoAdmision: null,
    tipoExhorto: null,
    fechaResolucionAmparo: null,
    horariosJuzgado: null,
    fechaAudienciaPrevia: null,
    fechaAudienciaPrueba: null,
    fechaSentencia: null,
    fechaResolucionAmparoSentencia: null,
    sentencia: null,
    fechaSentenciaApelacion: null,
    fechaAudienciaPruebas: null,
    resultadoEmplazamiento: null,
    etapaActual: null,
    liquidacion: null,
    convenio: null,
    valorLibros: null,
    fechaRepo: null,
    montoVenta: null,
    fechaVenta: null,
    fechaSeguimiento: null,

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

        // Número de factura
        definition.numeroFactura = definition.numeroFactura;

        // Fecha de Asignación
        definition.fechaAsignacion = definition.fechaAsignacion;
        formattedValues.fechaAsignacion = definition.fechaAsignacion ? moment(definition.fechaAsignacion.iso).format('D MMMM, YYYY') : null;

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

        // Fecha de Diligencia
        definition.fechaDiligencia = definition.fechaDiligencia;
        formattedValues.fechaDiligencia = definition.fechaDiligencia ? moment(definition.fechaDiligencia.iso).format('D MMMM, YYYY') : null;

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
        formattedValues.horariosJuzgado = definition.horariosJuzgado && definition.horariosJuzgado.fecha ? moment(definition.horariosJuzgado.fecha.iso).format('D MMMM, YYYY') + (definition.horariosJuzgado.horario.start != null && definition.horariosJuzgado.horario.end != null ? (' de ' + definition.horariosJuzgado.horario.start + ' a ' + definition.horariosJuzgado.horario.end) : '') : null;

        // Tipo de admisión
        definition.tipoAdmision = definition.tipoAdmision;

        // Tipo de exhorto
        definition.tipoExhorto = definition.tipoExhorto;

        // Resultado de emplazamiento
        definition.resultadoEmplazamiento = definition.resultadoEmplazamiento;

        // Etapa Actual
        definition.etapaActual = definition.etapaActual;

        // Liquidacion
        definition.liquidacion = definition.liquidacion;

        // Convenio
        definition.convenio = definition.convenio;

        // Valor en Libros
        definition.valorLibros = definition.valorLibros;

        // Fecha REPO
        definition.fechaRepo = definition.fechaRepo;
        formattedValues.fechaRepo = definition.fechaRepo ? moment(definition.fechaRepo.iso).format('D MMMM, YYYY') : null;

        // Monto de venta
        definition.montoVenta = definition.montoVenta;

        // Fecha de venta
        definition.fechaVenta = definition.fechaVenta;
        formattedValues.fechaVenta = definition.fechaVenta ? moment(definition.fechaVenta.iso).format('D MMMM, YYYY') : null;

        // Fecha de Seguimiento
        definition.fechaSeguimiento = definition.fechaSeguimiento;
        formattedValues.fechaSeguimiento = definition.fechaSeguimiento ? moment(definition.fechaSeguimiento.iso).format('D MMMM, YYYY') : null;

        definition.formattedValues = formattedValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            numeroContrato: this.numeroContrato,
            nombre: this.nombre,
            numeroFactura: this.numeroFactura,
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
            tipoAdmision: this.tipoAdmision,
            tipoExhorto: this.tipoExhorto,
            fechaDiligencia: this.fechaDiligencia,
            fechaAcuerdo: this.fechaAcuerdo,
            comentarioAcuerdoPendiente: this.comentarioAcuerdoPendiente,
            fechaDesechamiento: this.fechaDesechamiento,
            motivoDesechamiento: this.motivoDesechamiento,
            horariosJuzgado: this.horariosJuzgado,
            resultadoEmplazamiento: this.resultadoEmplazamiento,
            etapaActual: this.etapaActual,
            liquidacion: this.liquidacion,
            convenio: this.convenio,
            valorLibros: this.valorLibros,
            fechaRepo: this.fechaRepo,
            montoVenta: this.montoVenta,
            fechaVenta: this.fechaVenta,
            fechaSeguimiento: this.fechaSeguimiento
        };
    }
}

module.exports = Reporte;
