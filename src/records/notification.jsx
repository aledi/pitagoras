'use strict';

// -----------------------------------------------------------------------------------------------
// Immutable + Other Modules
// -----------------------------------------------------------------------------------------------

var Immutable = require('immutable');
var moment = require('moment');

// -----------------------------------------------------------------------------------------------
// NotificationRecord
// -----------------------------------------------------------------------------------------------

var NotificationRecord = Immutable.Record({
    tipo: null,
    tipoAccion: null,
    contratoId: null,
    numeroContrato: null,
    fecha: null,
    hora: null,
    horario: null,
    cita: {},

    formattedValues: {}
});

class Notification extends NotificationRecord {
    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        // Tipo
        definition.tipo = definition.tipo;

        // Tipo de Acción
        definition.tipoAccion = definition.tipoAccion;

        // Contrato ID
        definition.contratoId = definition.contratoId;

        // Numero de Contrato
        definition.numeroContrato = definition.numeroContrato;

        // Fecha
        if (definition.fecha) {
            definition.fecha = moment(definition.fecha.iso || definition.fecha);
            formattedValues.fecha = definition.fecha.format('D MMMM, YYYY');
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
            definition.fecha = moment(definition.cita.fecha.iso);
            formattedValues.cita = {
                fecha: moment(definition.cita.fecha.iso).format('D MMMM, YYYY'),
                lugar: definition.lugar,
                nombreActuario: definition.nombreActuario,
                telefonoActuario: definition.telefonoActuario
            };
        }

        definition.formattedValues = formattedValues;

        super(definition);
    }
}

module.exports = Notification;
