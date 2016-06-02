'use strict';

var Immutable = require('immutable');

var ClienteRecord = Immutable.Record({
    id: null,
    apellidoMaterno: '',
    apellidoPaterno: '',
    domicilio: null,
    nombre: '',
    telefonos: null
});

class Cliente extends ClienteRecord {
    static prepareForParse (cliente) {
        cliente.domicilio = {
            calle: cliente.domicilio.calle,
            interior: parseInt(cliente.domicilio.interior, 10),
            exterior: parseInt(cliente.domicilio.exterior, 10),
            colonia: cliente.domicilio.colonia,
            municipio: cliente.domicilio.municipio,
            codigo: parseInt(cliente.domicilio.codigo, 10),
            estado: cliente.domicilio.estado
        };

        cliente.telefonos = [parseInt('1', 10), parseInt('2', 10)];

        return cliente;
    }

    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        definition.domicilio = {};
        definition.telefonos = [];

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            apellidoMaterno: this.apellidoMaterno,
            apellidoPaterno: this.apellidoPaterno,
            domicilio: this.domicilio,
            nombre: this.nombre,
            telefonos: this.telefonos
        };
    }
}

module.exports = Cliente;
