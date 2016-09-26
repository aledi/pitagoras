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

            // -----------------------------------------------------------------------------------------------
            // Save
            // -----------------------------------------------------------------------------------------------

            case 'USUARIOS_SAVE':
                return state.merge({saving: true, saveError: null});
            case 'USUARIOS_SAVE_SUCCESS':
                var usuarios = state.get('usuarios').set(action.usuario.id, action.usuario);
                return state.merge({saving: false, usuarios: usuarios});
            case 'USUARIOS_SAVE_ERROR':
                return state.merge({saving: false, saveError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Delete
            // -----------------------------------------------------------------------------------------------

            case 'USUARIOS_DELETE':
                return state.merge({deleting: true, deleteError: null});
            case 'USUARIOS_DELETE_SUCCESS':
                return state.merge({deleting: false, usuarios: state.get('usuarios').delete(action.usuarioId)});
            case 'USUARIOS_DELETE_ERROR':
                return state.merge({deleting: false, deleteError: action.error});
            default:
                return state;
        }
    }
}

module.exports = new UsuariosStore(Dispatcher);
