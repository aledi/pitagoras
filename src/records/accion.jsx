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
    respuestas: null
});

class Accion extends AccionRecord {
    static prepareForParse (accion) {
        accion.contrato = new ContratoObject(ContratoRecord.prepareForParse(accion.contrato.toEditable()));
        return accion;
    }
}

module.exports = Accion;
