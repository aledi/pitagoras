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
    tipoAccion: null,
    contratoId: null,
    numeroContrato: null,
    fecha: null,
    hora: null,
    horario: null,
    cita: {},

    formattedValues: {}
});

class Notificacion extends NotificacionRecord {
    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        // Tipo
        definition.tipo = definition.tipo;

        // Tipo
        definition.tipoAccion = definition.tipoAccion;

        // Contrato ID
        definition.contratoId = definition.contratoId;

        // Numero de Contrato
        definition.numeroContrato = definition.numeroContrato;

        // Fecha
        if (definition.fecha) {
            definition.fecha = moment(definition.fecha.iso || definition.fecha);
            formattedValues.fecha = definition.fecha.format('D/MMM/YYYY');
        }

        // Hora
        definition.hora = definition.hora;

        // Horario
        if (definition.horario && definition.horario.start != null && definition.horario.end != null) {
            definition.horario = definition.horario;
            formattedValues.horario = definition.horario.start + ' - ' + definition.horario.end;
        }

        // Cita
        if (definition.cita) {
            definition.cita = definition.cita;
            definition.fecha = definition.cita.fecha ? moment(definition.cita.fecha.iso) : null;
            formattedValues.cita = {
                fecha: definition.cita.fecha ? moment(definition.cita.fecha.iso).format('D/MMM/YYYY') : null,
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
