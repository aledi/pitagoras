'use strict';

var Immutable = require('immutable');

var ContratoRecord = Immutable.Record({
    id: null,
    numeroContrato: '',
    fechaContrato: null,
    monto: null,
    plazo: null,
    tasa: null
});

class Contrato extends ContratoRecord {
    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            fechaContrato: this.fechaContrato,
            monto: this.monto,
            plazo: this.plazo,
            tasa: this.tasa
        };
    }
}

module.exports = Contrato;
