'use strict';

require('src/stores/contratos-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var ContratoRecord = require('src/records/contrato');
var ContratoObject = Parse.Object.extend('Contrato');
var AccionObject = Parse.Object.extend('Accion');

module.exports = {
    fetchContratos: function () {
        Dispatcher.dispatch({
            type: 'CONTRATOS_FETCH'
        });

        var query = new Parse.Query(ContratoObject);
        query.include('cliente');
        query.include('vehiculo');
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

        var contratoForParse = Object.assign({}, contrato);
        contratoForParse = ContratoRecord.prepareForParse(contratoForParse);

        (new ContratoObject()).save(contratoForParse).then(function (payload) {
            Dispatcher.dispatch({
                type: 'CONTRATOS_SAVE_SUCCESS',
                contrato: createContratoRecord(payload)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'CONTRATOS_SAVE_ERROR',
                error: error
            });
        });
    },
    saveAccion: function (accion) {
        Dispatcher.dispatch({
            type: 'CONTRATOS_SAVE_ACCION'
        });

        (new AccionObject()).save(accion).then(function (payload) {
            Dispatcher.dispatch({
                type: 'CONTRATOS_SAVE_ACCION_SUCCESS',
                contrato: createContratoRecord(payload)
            });
        });
    },
    sortContratos: function (sortColumn) {
        Dispatcher.dispatch({
            type: 'CONTRATOS_SORT',
            sortColumn: sortColumn
        });
    }
};

function createContratoRecord (contrato) {
    return new ContratoRecord(contrato.toJSON());
}
