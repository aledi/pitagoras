'use strict';

var Parse = require('parse');
var Dispatcher = require('src/dispatcher');

var AccionObject = Parse.Object.extend('Accion');

module.exports = {
    saveAccion: function (accion) {
        Dispatcher.dispatch({
            type: 'ACCION_SAVE'
        });

        (new AccionObject()).save(accion).then(function (payload) {
            Dispatcher.dispatch({
                type: 'ACCION_SAVE_SUCCESS'
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'ACCION_SAVE_ERROR',
                error: error
            });
        });
    }
};
