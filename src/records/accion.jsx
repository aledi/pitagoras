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
    3: 'Apertura de juicio',
    4: 'Presentación de demanda',
    5: 'Acuerdo de demanda',
    6: 'Demanda desechada',
    7: 'Recolección de documentos',
    8: 'Demanda prevenida',
    9: 'Demanda admitida',
    10: 'Diligencia de embargo',
    11: 'Emplazamiento',
    12: 'Desahogo / Cierre'
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
