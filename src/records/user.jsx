'use strict';

var Immutable = require('immutable');

// -----------------------------------------------------------------------------------------------
// UserRecord
// -----------------------------------------------------------------------------------------------

var UserRecord = Immutable.Record({
    id: null,
    nombre: '',
    apellido: '',
    usuarioNuevo: null,
    tipo: null,
    email: null,
    username: null,
    password: null,

    formattedValues: {}
});

class User extends UserRecord {
    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        // Id
        definition.id = definition.id || definition.objectId;

        definition.formattedValues = formattedValues;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            usuarioNuevo: this.usuarioNuevo,
            tipo: this.tipo,
            email: this.email,
            username: this.username,
            password: this.password
        };
    }
}

module.exports = User;
