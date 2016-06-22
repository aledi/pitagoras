'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var Parse = require('parse');
var moment = require('moment');

var ContratoObject = Parse.Object.extend('Contrato');
var ContratoRecord = require('./contrato');

// -----------------------------------------------------------------------------------------------
// ContratoRecord
// -----------------------------------------------------------------------------------------------

var ACCIONES_TYPES = {
    1: 'Visita',
    2: 'Alta de documentos',
    3: 'Presentación de demanda',
    4: 'Acuerdo de demanda',
    5: 'Demanda desechada',
    6: 'Recolección de documentos',
    7: 'Demanda prevenida',
    8: 'Demanda admitida',
    9: 'Diligencia de embargo',
    10: 'Emplazamiento',
    11: 'Desahogo / Cierre'
};

var AccionRecord = Immutable.Record({
    id: null,
    tipo: null,
    comentarios: '',
    creador: null,
    contrato: null,
    respuestas: null,
    fecha: null,

    formattedValues: {}
});

class Accion extends AccionRecord {
    static get ACCIONES_TYPES () {
        return ACCIONES_TYPES;
    }

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

        // Fecha
        var createdAt = moment(definition.createdAt ? new Date(definition.createdAt) : new Date());
        definition.fecha = createdAt.format('D MMMM, YYYY');

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Accion;
