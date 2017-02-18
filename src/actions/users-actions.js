'use strict';

require('src/stores/reportes-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var UserRecord = require('src/records/user');
var UserObject = Parse.Object.extend('User');

module.exports = {
    fetchUsers: function () {
        Dispatcher.dispatch({
            type: 'USERS_FETCH'
        });

        var query = new Parse.Query(UserObject);
        query.limit(5000);
        query.find().then(function (users) {
            var usersByKey = {};
            for (var i = 0; i < users.length; i++) {
                usersByKey[users[i].id] = createUserRecord(users[i]);
            }

            Dispatcher.dispatch({
                type: 'USERS_FETCH_SUCCESS',
                users: new Immutable.Map(usersByKey)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USERS_FETCH_ERROR',
                error: error
            });
        });
    },
    saveUser: function (changes) {
        Dispatcher.dispatch({
            type: 'USERS_SAVE',
            changes: changes
        });

        Parse.Cloud.run('saveUser', {user: changes}).then(function (user) {
            Dispatcher.dispatch({
                type: 'USERS_SAVE_SUCCESS',
                changes: changes,
                user: createUserRecord(user)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USERS_SAVE_ERROR',
                error: error,
                changes: changes
            });
        });
    },
    deleteUser: function (userId) {
        Dispatcher.dispatch({
            type: 'USERS_DELETE',
            userId: userId
        });

        Parse.Cloud.run('deleteUser', {userId: userId}).then(function () {
            Dispatcher.dispatch({
                type: 'USERS_DELETE_SUCCESS',
                userId: userId
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'USERS_DELETE_ERROR',
                error: error,
                userId: userId
            });
        });
    }
};

function createUserRecord (user) {
    return new UserRecord(user.toJSON());
}
