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
var RespuestasUtils = require('src/components/respuestas/respuestas-utils');
var VehiculoObject = Parse.Object.extend('Vehiculo');
var VehiculoRecord = require('./vehiculo');

// -----------------------------------------------------------------------------------------------
// ContratoRecord
// -----------------------------------------------------------------------------------------------

var ContratoRecord = Immutable.Record({
    id: null,
    cliente: null,
    especial: null,
    fechaContrato: null,
    juzgado: null,
    monto: null,
    numeroContrato: '',
    plazo: null,
    referencias: null,
    tasa: null,
    vehiculo: null,
    notification: null,

    formattedValues: {},
    sortValues: {}
});

class Contrato extends ContratoRecord {
    static prepareForParse (contrato) {
        contrato.monto = (typeof contrato.monto === 'string') ? parseFloat(contrato.monto.replace(/,/g, '')) : contrato.monto;
        contrato.plazo = (typeof contrato.plazo === 'string') ? parseFloat(contrato.plazo) : contrato.plazo;
        contrato.tasa = (typeof contrato.tasa === 'string') ? parseFloat(contrato.tasa.replace(/,/g, '')) : contrato.tasa;

        contrato.fechaContrato = contrato.fechaContrato.toDate();

        contrato.vehiculo = new VehiculoObject(VehiculoRecord.prepareForParse(contrato.vehiculo));
        contrato.cliente = new ClienteObject(ClienteRecord.prepareForParse(contrato.cliente));

        return contrato;
    }

    constructor (definition) {
        definition = definition || {};

        var formattedValues = {};
        var sortValues = {};

        definition.id = definition.id || definition.objectId;

        // Número de Contrato
        definition.numeroContrato = definition.numeroContrato;
        sortValues.numeroContrato = definition.numeroContrato;

        // Fecha Contrato
        definition.fechaContrato = definition.fechaContrato ? moment(definition.fechaContrato.iso) : moment();
        formattedValues.fechaContrato = definition.fechaContrato.format('D/MMM/YYYY');

        // Vehiculo
        definition.vehiculo = new VehiculoRecord(definition.vehiculo);
        sortValues.modelo = definition.vehiculo.modelo.toLowerCase();
        sortValues.marca = definition.vehiculo.marca.toLowerCase();
        sortValues.anio = definition.vehiculo.anio;
        sortValues.distribuidor = definition.vehiculo.distribuidor.toLowerCase();

        // Juzgado
        definition.juzgado = definition.juzgado || '';
        sortValues.juzgado = definition.juzgado.toLowerCase();

        // Cliente
        definition.cliente = new ClienteRecord(definition.cliente);
        sortValues.cliente = definition.cliente.formattedValues.nombre.toLowerCase();

        // Monto
        definition.monto = definition.monto;
        formattedValues.monto = formatNumber({prefix: '$', padRight: 2})(definition.monto);
        sortValues.monto = definition.monto;

        // Monto
        definition.plazo = definition.plazo;
        sortValues.plazo = definition.plazo;

        // Tasa
        definition.tasa = definition.tasa;
        formattedValues.tasa = formatNumber({suffix: '%'})(definition.tasa);
        sortValues.tasa = definition.tasa;

        // Cliente
        definition.especial = definition.especial || false;
        formattedValues.especial = RespuestasUtils.formatBooleanRespuesta(definition.especial);
        sortValues.especial = definition.especial;

        // Notificacion
        definition.notification = definition.notification;

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

        definition.formattedValues = formattedValues;
        definition.sortValues = sortValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            cliente: this.cliente.toEditable(),
            fechaContrato: this.fechaContrato ? this.fechaContrato : moment(),
            monto: this.monto,
            numeroContrato: this.numeroContrato,
            plazo: this.plazo,
            referencias: this.referencias || [],
            tasa: this.tasa,
            vehiculo: this.vehiculo.toEditable(),
            juzgado: this.juzgado,
            especial: this.especial,
            notification: this.notification
        };
    }
}

module.exports = Contrato;
