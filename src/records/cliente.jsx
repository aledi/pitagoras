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
            interior: cliente.domicilio.interior,
            exterior: cliente.domicilio.exterior,
            colonia: cliente.domicilio.colonia,
            municipio: cliente.domicilio.municipio,
            codigoPostal: parseInt(cliente.domicilio.codigoPostal, 10),
            estado: cliente.domicilio.estado
        };

        return cliente;
    }

    constructor (definition) {
        definition = definition || {};

        definition.id = definition.id || definition.objectId;

        super(definition);
    }

    toEditable () {
        return {
            id: this.id,
            apellidoMaterno: this.apellidoMaterno,
            apellidoPaterno: this.apellidoPaterno,
            domicilio: this.domicilio || {},
            nombre: this.nombre,
            telefonos: this.telefonos || ['']
        };
    }
}

module.exports = Cliente;
