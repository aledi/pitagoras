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
    tipo: null,
    numeroContrato: null,
    fecha: null,
    hora: null,
    horario: null,
    cita: {},

    formattedValues: {}
});

class Notificacion extends NotificacionRecord {
    constructor (definition, numeroContrato) {
        definition = definition || {};
        var formattedValues = {};

        // Tipo
        definition.tipo = definition.tipo;

        // Numero de Contrato
        definition.numeroContrato = numeroContrato;

        // Fecha
        if (definition.fecha) {
            definition.fecha = moment(definition.fecha.iso);
            formattedValues.fecha = definition.fecha.format('D/MMM/YYYY');
        }

        // Hora
        definition.hora = definition.hora;

        // Horario
        if (definition.horario) {
            definition.horario = definition.horario;
            formattedValues.horario = definition.horario.start + ' - ' + definition.horario.end;
        }

        // Cita
        if (definition.cita) {
            definition.cita = definition.cita;
            formattedValues.cita = {
                fecha: moment(definition.cita.fecha.iso).format('D/MMM/YYYY'),
                lugar: definition.lugar,
                nombreActuario: definition.nombreActuario,
                telefonoActuario: definition.telefonoActuario
            };
        }

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Notificacion;
