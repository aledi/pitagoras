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

            case 'ACCIONES_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'ACCIONES_FETCH_SUCCESS':
                var newState = {fetching: false};
                newState[action.contratoId] = action.acciones;

                return state.merge(newState);
            case 'ACCIONES_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Save
            // -----------------------------------------------------------------------------------------------

            case 'ACCIONES_SAVE':
                return state.merge({saving: true, saveError: null});
            case 'ACCIONES_SAVE_SUCCESS':
                return createSuccess(state, action);
            case 'ACCIONES_SAVE_ERROR':
                return state.merge({saving: false, saveError: action.error});
            default:
                return state;
        }
    }
}

function createSuccess (state, action) {
    var newState = {saving: false};
    var acciones = state.get(action.contratoId);
    newState[action.contratoId] = acciones.unshift(action.accion);

    return state.merge(newState);
}

module.exports = new AccionesStore(Dispatcher);
