'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class ContratosStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            contratos: new Immutable.Map(),
            notificaciones: new Immutable.Map(),

            fetching: false,
            fetchError: null,

            saving: false,
            saveError: null,

            sortColumn: 'nombreCliente',
            ascending: false
        });
    }

    reduce (state, action) {
        switch (action.type) {

            // -----------------------------------------------------------------------------------------------
            // Fetch
            // -----------------------------------------------------------------------------------------------

            case 'CONTRATOS_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'CONTRATOS_FETCH_SUCCESS':
                return state.merge({fetching: false, contratos: action.contratos, notificaciones: action.notificaciones});
            case 'CONTRATOS_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Save
            // -----------------------------------------------------------------------------------------------

            case 'CONTRATOS_SAVE':
                return state.merge({saving: true, saveError: null});
            case 'CONTRATOS_SAVE_SUCCESS':
                return state.merge({saving: false, contratos: state.get('contratos').set(action.contrato.id, action.contrato)});
            case 'CONTRATOS_SAVE_ERROR':
                return state.merge({saving: false, saveError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Sort
            // -----------------------------------------------------------------------------------------------

            case 'NOTIFICACIONES_UPDATE':
                return state.merge({notificaciones: state.get('notificaciones').set(action.contratoId, action.notificacion)});

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

module.exports = new ContratosStore(Dispatcher);
