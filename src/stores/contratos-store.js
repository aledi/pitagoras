'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var NotificationRecord = require('src/records/notification');

class ContratosStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            contratos: new Immutable.Map(),
            notifications: new Immutable.Map(),

            fetching: false,
            fetchError: null,

            saving: false,
            saveError: null,

            sortColumn: 'nombreCliente',
            ascending: false
        });
    }

    getContratosForSearch () {
        var contratos = this.get('contratos').toArray();
        var contratosForSearch = [];
        for (var i = 0; i < contratos.length; i++) {
            var contrato = contratos[i];

            contratosForSearch.push({
                id: contrato.id,
                value: contrato.numeroContrato + ' - ' + contrato.cliente.formattedValues.nombre,
                title: contrato.numeroContrato + ' - ' + contrato.cliente.formattedValues.nombre
            });
        }

        return contratosForSearch;
    }

    reduce (state, action) {
        switch (action.type) {

            // -----------------------------------------------------------------------------------------------
            // Fetch
            // -----------------------------------------------------------------------------------------------

            case 'CONTRATOS_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'CONTRATOS_FETCH_SUCCESS':
                return state.merge({fetching: false, contratos: action.contratos, notifications: sortNotifications(action.notifications)});
            case 'CONTRATOS_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Save
            // -----------------------------------------------------------------------------------------------

            case 'CONTRATOS_SAVE':
                return state.merge({saving: true, saveError: null});
            case 'CONTRATOS_SAVE_SUCCESS':
                var newState = {
                    saving: false,
                    contratos: state.get('contratos').set(action.contrato.id, action.contrato)
                };

                if (action.contrato.notificacion) {
                    newState.notifications = sortNotifications(state.get('notifications').set(action.contrato.id, createNotificationRecord(action.contrato.notificacion)));
                }

                return state.merge(newState);
            case 'CONTRATOS_SAVE_ERROR':
                return state.merge({saving: false, saveError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Sort
            // -----------------------------------------------------------------------------------------------

            case 'NOTIFICATIONS_UPDATE':
                return state.merge({notifications: sortNotifications(state.get('notifications').set(action.contratoId, action.notification))});

            // -----------------------------------------------------------------------------------------------
            // Sort
            // -----------------------------------------------------------------------------------------------

            case 'CONTRATOS_SORT':
                return updateSortColumn(state, action.sortColumn);
            default:
                return state;
        }
    }
}

function updateSortColumn (state, sortColumn) {
    var ascending = state.get('ascending');
    var newState = {};

    if (state.get('sortColumn') === sortColumn) {
        ascending = !ascending;
        newState.ascending = ascending;
    } else {
        newState.sortColumn = sortColumn;
    }

    newState.contratos = sortContratos(state.get('contratos'), sortColumn, ascending);

    return state.merge(newState);
}

function sortContratos (contratos, sortColumn, ascending) {
    if (!sortColumn) {
        return contratos;
    }

    return contratos.sort(function (a, b) {
        a = a.sortValues[sortColumn];
        b = b.sortValues[sortColumn];

        if (a === b) {
            return 0;
        } else if (a < b) {
            return ascending ? -1 : 1;
        } else {
            return ascending ? 1 : -1;
        }
    });
}

function sortNotifications (notifications) {
    return notifications.sort(function (a, b) {
        a = a.fecha.clone().toDate();
        b = b.fecha.clone().toDate();

        if (a === b) {
            return 0;
        } else if (a < b) {
            return -1;
        } else {
            return 1;
        }
    });
}

function createNotificationRecord (notification, numeroContrato) {
    return new NotificationRecord(notification, numeroContrato);
}

module.exports = new ContratosStore(Dispatcher);
