'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class ContratosStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            contratos: new Immutable.Map(),

            fetching: true, // Start in fetching state
            fetchError: null
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
                return state.merge({fetching: false, contratos: action.contratos});
            case 'CONTRATOS_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});
            default:
                return state;
        }
    }
}

module.exports = new ContratosStore(Dispatcher);
