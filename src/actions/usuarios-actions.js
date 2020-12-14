'use strict';

require('../stores/reportes-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('../dispatcher');

var UsuarioRecord = require('../records/usuario');
var UsuarioObject = Parse.Object.extend('User');

module.exports = {
    fetchUsuarios: function () {
        Dispatcher.dispatch({
            type: 'USUARIOS_FETCH'
        });

        var query = new Parse.Query(UsuarioObject);
        query.limit(5000);
        query.find().then(function (usuarios) {
            var usuariosByKey = {};
            for (var i = 0; i < usuarios.length; i++) {
                usuariosByKey[usuarios[i].id] = createUsuarioRecord(usuarios[i]);
            }

            Dispatcher.dispatch({
                type: 'USUARIOS_FETCH_SUCCESS',
                usuarios: new Immutable.Map(usuariosByKey)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USUARIOS_FETCH_ERROR',
                error: error
            });
        });
    },
    saveUsuario: function (changes) {
        Dispatcher.dispatch({
            type: 'USUARIOS_SAVE',
            changes: changes
        });

        Parse.Cloud.run('saveUser', {user: changes}).then(function (usuario) {
            Dispatcher.dispatch({
                type: 'USUARIOS_SAVE_SUCCESS',
                changes: changes,
                usuario: createUsuarioRecord(usuario)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USUARIOS_SAVE_ERROR',
                error: error,
                changes: changes
            });
        });
    },
    deleteUsuario: function (usuarioId) {
        Dispatcher.dispatch({
            type: 'USUARIOS_DELETE',
            usuarioId: usuarioId
        });

        Parse.Cloud.run('deleteUser', {usuarioId: usuarioId}).then(function () {
            Dispatcher.dispatch({
                type: 'USUARIOS_DELETE_SUCCESS',
                usuarioId: usuarioId
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USUARIOS_DELETE_ERROR',
                error: error,
                usuarioId: usuarioId
            });
        });
    }
};

function createUsuarioRecord (user) {
    return new UsuarioRecord(user.toJSON());
}
