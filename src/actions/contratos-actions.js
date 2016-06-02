'use strict';

require('src/stores/contratos-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var ContratoRecord = require('src/records/contrato');
var ContratoObject = Parse.Object.extend('Contrato');

module.exports = {
    fetchContratos: function () {
        Dispatcher.dispatch({
            type: 'CONTRATOS_FETCH'
        });

        var query = new Parse.Query(ContratoObject);
        query.limit(1000);
        query.find().then(function (contratos) {
            var contratosByKey = {};
            for (var i = 0; i < contratos.length; i++) {
                contratosByKey[contratos[i].id] = createContratoRecord(contratos[i]);
            }

            Dispatcher.dispatch({
                type: 'CONTRATOS_FETCH_SUCCESS',
                contratos: new Immutable.Map(contratosByKey)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'CONTRATOS_FETCH_ERROR',
                error: error
            });
        });
    },
    saveContrato: function (contrato) {
        Dispatcher.dispatch({
            type: 'CONTRATOS_SAVE'
        });
        
        (new ContratoObject()).save(contrato).then(function (payload) {
            alert("Contrato guardado correctamente.");
            console.log("Contrato guardado correctamente.");
            Dispatcher.dispatch({
                type: 'CONTRATOS_SAVE_SUCCESS',
                contrato: createContratoRecord(payload)
            });
        }).catch(function (error) {
            alert("Error al guardar contraro.");
            console.log("Error al guardar contraro.");
            console.log(error)
            Dispatcher.dispatch({
                type: 'CONTRATOS_SAVE_ERROR',
                error: error
            });
        });
    }
};

function createContratoRecord (contrato) {
    return new ContratoRecord(contrato.toJSON());
}
