'use strict';

var Immutable = require('immutable');

var ContratoRecord = Immutable.Record({
    id: null
});

class Contrato extends ContratoRecord {
    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id
        };
    }
}

module.exports = Contrato;
