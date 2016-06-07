'use strict';

var Immutable = require('immutable');
var Parse = require('parse');

var VehiculoObject = Parse.Object.extend('Vehiculo');
var VehiculoRecord = require('./vehiculo');

var ClienteObject = Parse.Object.extend('Cliente');
var ClienteRecord = require('./cliente');

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

        // Vehiculo
        definition.vehiculo = new VehiculoRecord(definition.vehiculo);

        // Cliente
        definition.cliente = new ClienteRecord(definition.cliente);
        formattedValues.cliente = definition.cliente.nombre + ' ' + definition.cliente.apellidoPaterno + ' ' + definition.cliente.apellidoMaterno;

        // Monto
        definition.monto = definition.monto;
        formattedValues.monto = '$' + definition.monto;

        // Tasa
        definition.tasa = definition.tasa;
        formattedValues.tasa = definition.tasa + '%';

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
