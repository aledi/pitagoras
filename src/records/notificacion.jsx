'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var moment = require('moment');

// -----------------------------------------------------------------------------------------------
// NotificacionRecord
// -----------------------------------------------------------------------------------------------

var NotificacionRecord = Immutable.Record({
    numeroContrato: null,
    fecha: null,

    formattedValues: {}
});

class Notificacion extends NotificacionRecord {
    constructor (definition, numeroContrato) {
        definition = definition || {};
        var formattedValues = {};

        definition.numeroContrato = numeroContrato;

        // Fecha
        definition.fecha = moment(definition.fecha.iso);
        formattedValues.fecha = definition.fecha.format('D/MMM/YYYY');

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Notificacion;
