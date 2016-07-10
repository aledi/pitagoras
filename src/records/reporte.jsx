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
    paqueteLegal: '',
    fechaPaqueteLegal: null,
    fechaVisita: null,
    resultadoVisita: '',
    fechaPresentacionDemanda: null,
    expediente: '',
    juzgado: '',
    tipoJuicio: '',
    fechaAcuerdo: null,
    fechaDesechamiento: null,
    motivoDesechamiento: '',
    fechaRadicacion: null,
    horariosJuzgado: null,
    etapaActual: null,

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
        definition.fechaAsignacion = definition.createdAt;
        formattedValues.fechaAsignacion = definition.createdAt ? moment(definition.createdAt).format('D MMMM, YYYY') : moment();

        // Paquete Legal
        definition.paqueteLegal = definition.paqueteLegal;
        formattedValues.paqueteLegal = RespuestasUtils.formatBooleanRespuesta(definition.paqueteLegal);

        // Fecha de Paquete Legal
        definition.fechaPaqueteLegal = definition.fechaPaqueteLegal;
        formattedValues.fechaPaqueteLegal = definition.fechaPaqueteLegal ? moment(definition.fechaPaqueteLegal.iso).format('D MMMM, YYYY') : null;

        // Fecha de Visita
        definition.fechaVisita = definition.fechaVisita;
        formattedValues.fechaVisita = definition.fechaVisita ? moment(definition.fechaVisita.iso) : null;

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

        // Fecha de Desechamiento
        definition.fechaDesechamiento = definition.fechaDesechamiento;
        formattedValues.fechaDesechamiento = definition.fechaDesechamiento ? moment(definition.fechaDesechamiento.iso).format('D MMMM, YYYY') : null;

        // Motivo de Desechamiento
        definition.motivoDesechamiento = definition.motivoDesechamiento;

        // Fecha de Radicación
        definition.fechaRadicacion = definition.fechaRadicacion;
        formattedValues.fechaRadicacion = definition.fechaRadicacion ? moment(definition.fechaRadicacion.iso).format('D MMMM, YYYY') : null;

        // Horarios de Juzgado
        definition.horariosJuzgado = definition.horariosJuzgado;
        formattedValues.horariosJuzgado = definition.horariosJuzgado;

        // Etapa Actual
        definition.etapaActual = definition.etapaActual;

        definition.formattedValues = formattedValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            numeroContrato: this.numeroContrato,
            nombre: this.nombre,
            fechaAsignacion: this.fechaAsignacion,
            paqueteLegal: this.paqueteLegal,
            fechaPaqueteLegal: this.fechaPaqueteLegal,
            fechaVisita: this.fechaVisita,
            resultadoVisita: this.resultadoVisita,
            fechaPresentacionDemanda: this.fechaPresentacionDemanda,
            expediente: this.expediente,
            juzgado: this.juzgado,
            tipoJuicio: this.tipoJuicio,
            fechaAcuerdo: this.fechaAcuerdo,
            fechaDesechamiento: this.fechaDesechamiento,
            motivoDesechamiento: this.motivoDesechamiento,
            fechaRadicacion: this.fechaRadicacion,
            horariosJuzgado: this.horariosJuzgado,
            etapaActual: this.etapaActual
        };
    }
}

module.exports = Reporte;
