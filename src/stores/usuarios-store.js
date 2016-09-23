'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class UsuariosStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            usuarios: new Immutable.Map(),
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

            case 'USUARIOS_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'USUARIOS_FETCH_SUCCESS':
                return state.merge({fetching: false, usuarios: action.usuarios});
            case 'USUARIOS_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});
            default:
                return state;
        }
    }
}

module.exports = new UsuariosStore(Dispatcher);
