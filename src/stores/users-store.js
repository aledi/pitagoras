'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class UsersStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            users: new Immutable.Map(),

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

            case 'USERS_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'USERS_FETCH_SUCCESS':
                return state.merge({fetching: false, users: action.users});
            case 'USERS_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Save
            // -----------------------------------------------------------------------------------------------

            case 'USERS_SAVE':
                return state.merge({saving: true, saveError: null});
            case 'USERS_SAVE_SUCCESS':
                var users = state.get('users').set(action.user.id, action.user);
                return state.merge({saving: false, users: users});
            case 'USERS_SAVE_ERROR':
                return state.merge({saving: false, saveError: action.error});

            // -----------------------------------------------------------------------------------------------
            // Delete
            // -----------------------------------------------------------------------------------------------

            case 'USERS_DELETE':
                return state.merge({deleting: true, deleteError: null});
            case 'USERS_DELETE_SUCCESS':
                return state.merge({deleting: false, users: state.get('users').delete(action.userId)});
            case 'USERS_DELETE_ERROR':
                return state.merge({deleting: false, deleteError: action.error});
            default:
                return state;
        }
    }
}

module.exports = new UsersStore(Dispatcher);
