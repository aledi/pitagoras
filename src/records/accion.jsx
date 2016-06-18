'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var Parse = require('parse');

var ContratoObject = Parse.Object.extend('Contrato');
var ContratoRecord = require('./contrato');

// -----------------------------------------------------------------------------------------------
// ContratoRecord
// -----------------------------------------------------------------------------------------------

var AccionRecord = Immutable.Record({
    id: null,
    tipo: null,
    comentarios: '',
    creador: null,
    contrato: null,
    respuestas: null,

    formattedValues: {}
});

class Accion extends AccionRecord {
    static prepareForParse (accion) {
        accion.contrato = new ContratoObject(ContratoRecord.prepareForParse(accion.contrato.toEditable()));
        return accion;
    }

    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        definition.id = definition.id || definition.objectId;

        // Creador
        definition.creador = definition.creador;
        formattedValues.creador = definition.creador.nombre + ' ' + definition.creador.apellido;

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Accion;
