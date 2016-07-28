'use strict';

require('src/stores/contratos-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');
var moment = require('moment');

var ContratoRecord = require('src/records/contrato');
var NotificacionRecord = require('src/records/notificacion');
var ContratoObject = Parse.Object.extend('Contrato');

module.exports = {
    fetchContratos: function () {
        Dispatcher.dispatch({
            type: 'CONTRATOS_FETCH'
        });

        var query = new Parse.Query(ContratoObject);
        query.include('cliente');
        query.include('vehiculo');
        query.include('reporte');
        query.include('creador');
        query.include('ultimoEditor');
        query.limit(1000);
        query.find().then(function (contratos) {
            var contratosByKey = {};
            var notificacionesByContratoId = {};

            for (var i = 0; i < contratos.length; i++) {
                var contrato = createContratoRecord(contratos[i]);

                if (contrato.notificacion) {
                    notificacionesByContratoId[contrato.id] = createNotificacionRecord(contrato.notificacion);
                } else {
                    var today = moment();
                    if (today.diff(contrato.lastAccionAt, 'days') > 7) {
                        notificacionesByContratoId[contrato.id] = createNotificacionRecord({
                            tipo: 4,
                            numeroContrato: contrato.numeroContrato,
                            contratoId: contrato.id,
                            fecha: contrato.lastAccionAt.clone().toISOString()
                        });
                    }
                }

                contratosByKey[contrato.id] = contrato;
            }

            Dispatcher.dispatch({
                type: 'CONTRATOS_FETCH_SUCCESS',
                contratos: new Immutable.Map(contratosByKey),
                notificaciones: new Immutable.Map(notificacionesByContratoId)
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

function createNotificacionRecord (notificacion, numeroContrato) {
    return new NotificacionRecord(notificacion, numeroContrato);
}
