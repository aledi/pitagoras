'use strict';

var Flux = require('flux');
var FluxUtils = require('flux/utils');
var dispatcher = new Flux.Dispatcher();

class ErrorStore extends FluxUtils.Store {
    __onDispatch (action) {
        if (action.type.indexOf('ERROR') === -1) {
            return;
        }
    }
}

dispatcher.errorStore = new ErrorStore(dispatcher);

module.exports = dispatcher;
