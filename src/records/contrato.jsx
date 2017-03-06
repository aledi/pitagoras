'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var Parse = require('parse');
var formatNumber = require('format-number');
var moment = require('moment');

var ClienteObject = Parse.Object.extend('Cliente');
var ClienteRecord = require('./cliente');
var ReporteObject = Parse.Object.extend('Reporte');
var ReporteRecord = require('./reporte');
var VehiculoObject = Parse.Object.extend('Vehiculo');
var VehiculoRecord = require('./vehiculo');

// -----------------------------------------------------------------------------------------------
// ContratoRecord
// -----------------------------------------------------------------------------------------------

var CONTRATO_TYPES = {
    PERDIDA: 'Pérdida',
    PERDIDA_POSIBLE: 'Pérdida Posible'
};

var DEPURACION_TYPES = {
    JUDICIAL: 1,
    EXTRAJUDICIAL: 2,
    JUDICIAL_EXTRAJUDICIAL: 3
};

var ASIGNACION_TYPES = {
    NORMAL: 'Normal',
    ESPECIAL: 'Especial',
    PILOTO: 'Piloto',
    PILOTO_NL: 'Piloto NL',
    PILOTO_INT: 'Piloto Interior',
    OTRO: 'Otro'
};

var JUICIO_TYPES = {
    ORAL: 'Oral Mercantil',
    EJECUTIVA: 'Ejecutiva Mercantil'
};

var ContratoRecord = Immutable.Record({
    id: null,
    tipoAsignacion: null,
    tipoContrato: null,
    tipoJuicio: null,
    depuracion: null,
    depuracionFecha: null,
    depuracionEditor: null,
    cliente: null,
    fechaContrato: null,
    juzgado: null,
    monto: '',
    numeroContrato: '',
    plazo: '',
    referencias: null,
    tasa: '',
    certificacionContable: null,
    vehiculo: null,
    notificacion: null,
    lastAccionAt: null,
    reporte: null,
    creador: null,
    ultimoEditor: null,

    formattedValues: {},
    sortValues: {}
});

class Contrato extends ContratoRecord {
    static get CONTRATO_TYPES () {
        return CONTRATO_TYPES;
    }

    static get ASIGNACION_TYPES () {
        return ASIGNACION_TYPES;
    }

    static get JUICIO_TYPES () {
        return JUICIO_TYPES;
    }

    static get DEPURACION_TYPES () {
        return DEPURACION_TYPES;
    }

    static prepareForParse (contrato) {
        contrato.monto = (typeof contrato.monto === 'string') ? parseFloat(contrato.monto.replace(/,/g, '')) : contrato.monto;
        contrato.plazo = (typeof contrato.plazo === 'string') ? parseFloat(contrato.plazo) : contrato.plazo;
        contrato.tasa = (typeof contrato.tasa === 'string') ? parseFloat(contrato.tasa.replace(/,/g, '')) : contrato.tasa;

        if (contrato.notificacion) {
            contrato.notificacion = cleanNotification(contrato);
        }

        /* eslint-disable no-nested-ternary */

        contrato.fechaContrato = contrato.fechaContrato ? (moment.isMoment(contrato.fechaContrato) ? contrato.fechaContrato.toDate() : contrato.fechaContrato) : null;
        contrato.depuracionFecha = contrato.depuracionFecha ? (moment.isMoment(contrato.depuracionFecha) ? contrato.depuracionFecha.toDate() : contrato.depuracionFecha) : null;

        /* eslint-enable no-nested-ternary */

        contrato.lastAccionAt = contrato.lastAccionAt.toDate();

        contrato.reporte.nombre = contrato.cliente.nombre + ' ' + contrato.cliente.apellidoPaterno + (contrato.cliente.apellidoMaterno ? ' ' + contrato.cliente.apellidoMaterno : '');
        contrato.reporte.numeroContrato = contrato.numeroContrato;
        contrato.reporte.fechaAsignacion = contrato.fechaContrato;
        contrato.reporte.tipoContrato = contrato.tipoContrato;
        contrato.reporte.depuracion = contrato.depuracion;
        contrato.reporte.tipoAsignacion = contrato.tipoAsignacion;
        contrato.reporte.certificacionContable = contrato.certificacionContable;
        contrato.reporte = new ReporteObject(ReporteRecord.prepareForParse(contrato.reporte));
        contrato.vehiculo = new VehiculoObject(VehiculoRecord.prepareForParse(contrato.vehiculo));
        contrato.cliente = new ClienteObject(ClienteRecord.prepareForParse(contrato.cliente));

        var currentUser = Parse.User.current();

        if (contrato.id) {
            contrato.ultimoEditor = currentUser;
        } else {
            contrato.creador = currentUser;
            contrato.ultimoEditor = currentUser;
        }

        return contrato;
    }

    constructor (definition) {
        definition = definition || {};

        var formattedValues = {};
        var sortValues = {};

        definition.id = definition.id || definition.objectId;

        // Tipo Asignación
        definition.tipoAsignacion = definition.tipoAsignacion;

        // Tipo Contrato
        definition.tipoContrato = definition.tipoContrato;

        // Tipo Juicio
        definition.tipoJuicio = definition.tipoJuicio;

        // Depuración
        definition.depuracion = definition.depuracion;

        // Depuración Fecha
        definition.depuracionFecha = definition.depuracionFecha;

        // Depuración Editor
        definition.depuracionEditor = definition.depuracionEditor || '';

        // Número de Contrato
        definition.numeroContrato = definition.numeroContrato || '';
        sortValues.numeroContrato = definition.numeroContrato;

        // Fecha Contrato
        definition.fechaContrato = definition.fechaContrato;
        formattedValues.fechaContrato = definition.fechaContrato ? moment(definition.fechaContrato.iso).format('D MMMM, YYYY') : null;

        // Last Accion At
        definition.lastAccionAt = definition.lastAccionAt ? moment(definition.lastAccionAt.iso) : moment();

        // Vehiculo
        definition.vehiculo = definition.vehiculo ? new VehiculoRecord(definition.vehiculo) : new VehiculoRecord();
        sortValues.modelo = definition.vehiculo.modelo ? definition.vehiculo.modelo.toLowerCase() : '';
        sortValues.marca = definition.vehiculo.marca ? definition.vehiculo.marca.toLowerCase() : '';
        sortValues.anio = definition.vehiculo.anio;
        sortValues.distribuidor = definition.vehiculo.distribuidor ? definition.vehiculo.distribuidor.toLowerCase() : '';

        // Juzgado
        definition.juzgado = definition.juzgado || '';
        sortValues.juzgado = definition.juzgado.toLowerCase();

        // Cliente
        definition.cliente = definition.cliente ? new ClienteRecord(definition.cliente) : new ClienteRecord();
        sortValues.cliente = definition.cliente.formattedValues.nombre.trim().toLowerCase();

        // Monto
        definition.monto = definition.monto || '';
        formattedValues.monto = formatNumber({prefix: '$', padRight: 2})(definition.monto);
        sortValues.monto = definition.monto;

        // Plazo
        definition.plazo = definition.plazo || '';
        sortValues.plazo = definition.plazo;

        // Tasa
        definition.tasa = definition.tasa || '';
        formattedValues.tasa = formatNumber({suffix: '%'})(definition.tasa);
        sortValues.tasa = definition.tasa;

        // Certificacion Contable
        definition.certificacionContable = definition.certificacionContable;

        // Notificacion
        definition.notificacion = definition.notificacion;

        // Reporte
        definition.reporte = definition.reporte ? new ReporteRecord(definition.reporte) : new ReporteRecord();

        // Referencias
        if (definition.referencias && definition.referencias.length) {
            formattedValues.referencias = [];

            // TODO: determine if this is efficient enough
            for (var i = 0; i < definition.referencias.length; i++) {
                var referencia = definition.referencias[i];
                formattedValues.referencias.push({
                    nombre: referencia.nombre + ' ' + referencia.apellidoPaterno + ' ' + referencia.apellidoMaterno,
                    domicilio: referencia.domicilio.calle + ' ' + referencia.domicilio.interior + ' ' + referencia.domicilio.exterior + ' ' + referencia.domicilio.colonia + ' ' + referencia.domicilio.municipio + ' ' + referencia.domicilio.estado + ' ' + referencia.domicilio.codigoPostal,
                    telefono: referencia.telefono
                });
            }
        }

        // Creador
        definition.creador = definition.creador;
        if (definition.creador) {
            formattedValues.creador = definition.creador.nombre + ' ' + definition.creador.apellido;
        }

        // Ultimo Editor
        definition.ultimoEditor = definition.ultimoEditor;
        if (definition.ultimoEditor) {
            formattedValues.ultimoEditor = definition.ultimoEditor.nombre + ' ' + definition.ultimoEditor.apellido;
        }

        definition.formattedValues = formattedValues;
        definition.sortValues = sortValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            tipoAsignacion: this.tipoAsignacion || ASIGNACION_TYPES.NORMAL,
            tipoContrato: this.tipoContrato || CONTRATO_TYPES.PERDIDA,
            tipoJuicio: this.tipoJuicio,
            depuracion: this.depuracion,
            depuracionFecha: this.depuracionFecha,
            depuracionEditor: this.depuracionEditor,
            cliente: this.cliente.toEditable(),
            fechaContrato: this.fechaContrato,
            monto: this.monto,
            numeroContrato: this.numeroContrato,
            plazo: this.plazo,
            referencias: this.referencias || [],
            tasa: this.tasa,
            certificacionContable: this.certificacionContable || false,
            vehiculo: this.vehiculo.toEditable(),
            juzgado: this.juzgado,
            notificacion: this.notificacion,
            lastAccionAt: this.lastAccionAt,
            reporte: this.reporte.toEditable()
        };
    }

}

function cleanNotification (contrato) {
    var notificacion = contrato.notificacion;
    var cleanedNotificacion = {
        tipo: notificacion.tipo,
        tipoAccion: notificacion.tipoAccion,
        numeroContrato: contrato.numeroContrato,
        contratoId: contrato.id
    };

    switch (notificacion.tipo) {
        case 1:
            cleanedNotificacion.fecha = moment(notificacion.fecha).toDate();
            cleanedNotificacion.horario = notificacion.horario;

            return cleanedNotificacion;
        case 2:
            cleanedNotificacion.fecha = moment(notificacion.fecha).toDate();

            return cleanedNotificacion;
        case 3:
            cleanedNotificacion.cita = notificacion.cita;

            return cleanedNotificacion;
        case 5:
            cleanedNotificacion.fecha = moment(notificacion.fecha).toDate();
            cleanedNotificacion.hora = notificacion.hora;

            return cleanedNotificacion;
        default:
            return cleanedNotificacion;
    }
}

function getFormattedDepuracion (depuracion) {
    switch (depuracion) {
        case 1:
            return 'Judicial';
        case 2:
            return 'Extrajudicial';
        case 3:
            return 'Judicial y Extrajudicial';
        default:
            return null;
    }
}

Contrato.getFormattedDepuracion = getFormattedDepuracion;

module.exports = Contrato;
