'use strict';

require('src/stores/reportes-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var UsuarioRecord = require('src/records/usuario');
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
    deleteUsuario: function (usuarioId) {
        Dispatcher.dispatch({
            type: 'USUARIOS_DELETE',
            usuarioId: usuarioId
        });

        Parse.Cloud.run('deleteUsuario', {usuarioId: usuarioId}).then(function () {
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

        (new Parse.Query(UsuarioObject)).get(usuarioId).then(function (usuario) {
            usuario.destroy().then(function () {
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
