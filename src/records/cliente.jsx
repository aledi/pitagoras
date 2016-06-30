'use strict';

var Immutable = require('immutable');

// -----------------------------------------------------------------------------------------------
// ClienteRecord
// -----------------------------------------------------------------------------------------------

var ClienteRecord = Immutable.Record({
    id: null,
    apellidoMaterno: '',
    apellidoPaterno: '',
    domicilio: null,
    nombre: '',
    telefonos: null,

    formattedValues: {}
});

class Cliente extends ClienteRecord {
    static prepareForParse (cliente) {
        cliente.domicilio = {
            calle: cliente.domicilio.calle,
            interior: cliente.domicilio.interior,
            exterior: cliente.domicilio.exterior,
            colonia: cliente.domicilio.colonia,
            municipio: cliente.domicilio.municipio,
            estado: cliente.domicilio.estado,
            codigoPostal: cliente.domicilio.codigoPostal ? parseInt(cliente.domicilio.codigoPostal, 10) : null
        };

        return cliente;
    }

    constructor (definition) {
        definition = definition || {};
        var formattedValues = {};

        definition.id = definition.id || definition.objectId;
        definition.domicilio = definition.domicilio || {};

        // Nombre
        definition.nombre = definition.nombre;
        definition.apellidoPaterno = definition.apellidoPaterno;
        definition.apellidoMaterno = definition.apellidoMaterno;
        formattedValues.nombre = definition.nombre + ' ' + definition.apellidoPaterno + ' ' + definition.apellidoMaterno;

        // Domicilio
        if (definition.domicilio) {
            definition.domicilio = definition.domicilio;
            formattedValues.domicilio = definition.domicilio.calle + ' ' + definition.domicilio.interior + ' ' + definition.domicilio.exterior + ' ' + definition.domicilio.colonia + ' ' + definition.domicilio.municipio + ' ' + definition.domicilio.estado + ' ' + definition.domicilio.codigoPostal;
        }

        definition.formattedValues = formattedValues;

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
