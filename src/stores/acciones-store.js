'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class AccionesStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            fetching: false,
            fetchError: null,

            saving: false,
            saveError: null,

            deleting: false,
            deleteError: null
        });
    }

    reduce (state, action) {
        switch (action.type) {

            // -----------------------------------------------------------------------------------------------
            // Fetch
            // -----------------------------------------------------------------------------------------------

            case 'ACCION_FETCH_FOR_CONTRATO':
                return state.merge({fetching: true, fetchError: null});
            case 'ACCION_FETCH_FOR_CONTRATO_SUCCESS':
                var newState = {fetching: false};
                newState[action.contratoId] = action.acciones;

                return state.merge(newState);
            case 'ACCION_FETCH_FOR_CONTRATO_ERROR':
                return state.merge({fetching: false, fetchError: action.error});
            default:
                return state;
        }
    }
}

function createSuccess (state, action) {
    var newState = {saving: false};
    var notas = state.get(action.nota.ownerId);
    newState[action.nota.ownerId] = notas.unshift(action.nota);

    return state.merge(newState);
}

module.exports = new AccionesStore(Dispatcher);
