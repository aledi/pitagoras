'use strict';

var Immutable = require('immutable');
var VehiculoRecord = require('./vehiculo');

var ContratoRecord = Immutable.Record({
    id: null,
    cliente: null,
    fechaContrato: null,
    monto: null,
    numeroContrato: '',
    plazo: null,
    referencias: null,
    tasa: null,
    vehiculo: null
});

class Contrato extends ContratoRecord {
    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        definition.vehiculo = new VehiculoRecord(definition.vehiculo);

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            cliente: null,
            fechaContrato: this.fechaContrato,
            monto: this.monto,
            numeroContrato: this.numeroContrato,
            plazo: this.plazo,
            referencias: this.referencias,
            tasa: this.tasa,
            vehiculo: this.vehiculo ? this.vehiculo.toEditable() : null
        };
    }
}

module.exports = Contrato;
