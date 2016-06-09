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
var VehiculoObject = Parse.Object.extend('Vehiculo');
var VehiculoRecord = require('./vehiculo');

// -----------------------------------------------------------------------------------------------
// ContratoRecord
// -----------------------------------------------------------------------------------------------

var ContratoRecord = Immutable.Record({
    id: null,
    cliente: null,
    fechaContrato: null,
    monto: null,
    numeroContrato: '',
    plazo: null,
    referencias: null,
    tasa: null,
    vehiculo: null,

    formattedValues: {}
});

class Contrato extends ContratoRecord {
    static prepareForParse (contrato) {
        contrato.monto = parseFloat(contrato.monto);
        contrato.plazo = parseFloat(contrato.plazo);
        contrato.tasa = parseFloat(contrato.tasa);

        contrato.fechaContrato = new Date(parseInt(contrato.fechaContrato.anio, 10),
                                        parseInt(contrato.fechaContrato.mes, 10),
                                        parseInt(contrato.fechaContrato.dia, 10)
        );

        contrato.vehiculo = new VehiculoObject(VehiculoRecord.prepareForParse(contrato.vehiculo));
        contrato.cliente = new ClienteObject(ClienteRecord.prepareForParse(contrato.cliente));

        return contrato;
    }

    constructor (definition) {
        definition = definition || {};

        var formattedValues = {};

        definition.id = definition.id || definition.objectId;

        // Fecha
        definition.fechaContrato = definition.fechaContrato ? moment(definition.fechaContrato.iso) : moment();
        formattedValues.fechaContrato = definition.fechaContrato.format('D/MMM/YYYY');

        // Vehiculo
        definition.vehiculo = new VehiculoRecord(definition.vehiculo);

        // Cliente
        definition.cliente = new ClienteRecord(definition.cliente);

        // Monto
        definition.monto = definition.monto;
        formattedValues.monto = formatNumber({prefix: '$', padRight: 2})(definition.monto);

        // Tasa
        definition.tasa = definition.tasa;
        formattedValues.tasa = formatNumber({suffix: '%'})(definition.tasa);

        definition.formattedValues = formattedValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            cliente: this.cliente.toEditable(),
            fechaContrato: this.fechaContrato || {
                mes: 1,
                dia: 1,
                anio: new Date().getFullYear()
            },
            monto: this.monto,
            numeroContrato: this.numeroContrato,
            plazo: this.plazo,
            referencias: this.referencias || [],
            tasa: this.tasa,
            vehiculo: this.vehiculo.toEditable()
        };
    }
}

module.exports = Contrato;
