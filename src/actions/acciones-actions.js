'use strict';

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var AccionRecord = require('src/records/accion');
var AccionObject = Parse.Object.extend('Accion');

module.exports = {
    fetchAccionesForContrato: function (contratoId) {
        Dispatcher.dispatch({
            type: 'ACCION_FETCH_FOR_CONTRATO'
        });

        var query = new Parse.Query(AccionObject);
        query.include('creador');
        query.limit(5000);
        query.equalTo('contrato', new (Parse.Object.extend('Contrato'))({id: contratoId}));

        query.find().then(function (acciones) {
            // Convert array of Parse.Objects to Immutable.List of Nota Records
            acciones = acciones.map(function (accion) {
                return createAccionRecord(accion);
            });

            Dispatcher.dispatch({
                type: 'ACCION_FETCH_FOR_CONTRATO_SUCCESS',
                contratoId: contratoId,
                acciones: new Immutable.List(acciones)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'NOTAS_FETCH_ERROR',
                error: error
            });
        });
    },
    saveAccion: function (accion) {
        Dispatcher.dispatch({
            type: 'ACCION_SAVE'
        });

        (new AccionObject()).save(accion).then(function (payload) {
            Dispatcher.dispatch({
                type: 'ACCION_SAVE_SUCCESS'
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'ACCION_SAVE_ERROR',
                error: error
            });
        });
    }
};

function createAccionRecord (accion) {
    return new AccionRecord(accion.toJSON());
}
