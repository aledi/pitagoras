'use strict';

var Flux = require('flux/utils');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

class ReportesStore extends Flux.MapStore {
    getInitialState () {
        return new Immutable.Map({
            reportes: new Immutable.Map(),

            fetching: false,
            fetchError: null
        });
    }

    reduce (state, action) {
        switch (action.type) {

            // -----------------------------------------------------------------------------------------------
            // Fetch
            // -----------------------------------------------------------------------------------------------

            case 'REPORTES_FETCH':
                return state.merge({fetching: true, fetchError: null});
            case 'REPORTES_FETCH_SUCCESS':
                return state.merge({fetching: false, reportes: action.reportes});
            case 'REPORTES_FETCH_ERROR':
                return state.merge({fetching: false, fetchError: action.error});
            default:
                return state;
        }
    }
}

module.exports = new ReportesStore(Dispatcher);
