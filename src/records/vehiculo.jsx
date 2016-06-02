'use strict';

var Immutable = require('immutable');

var VehiculoRecord = Immutable.Record({
    id: null,
    anio: null,
    clase: '',
    distribuidor: '',
    marca: '',
    modelo: '',
    serie: ''
});

class Vehiculo extends VehiculoRecord {
    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            anio: this.anio,
            clase: this.clase,
            distribuidor: this.distribuidor,
            marca: this.marca,
            modelo: this.modelo,
            serie: this.serie
        };
    }
}

module.exports = Vehiculo;
