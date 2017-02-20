'use strict';

require('./users-content.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var UsersActions = require('src/actions/users-actions');

var UserEdit = require('./user-edit');

// -----------------------------------------------------------------------------------------------
// UsersContent
// -----------------------------------------------------------------------------------------------

var UsersContent = React.createClass({
    getInitialState: function () {
        return {savingUser: false};
    },
    render: function () {
        return (
            <div className='users-content'>
                {this.renderButton()}
                {this.renderContent()}
            </div>
        );
    },
    renderButton: function () {
        if (this.state.savingUser) {
            return (<button type='button' className='right-button' onClick={this.toggleAddingUser}>Regresar</button>);
        }

        return (<button type='button' className='right-button' onClick={this.toggleAddingUser}>Agregar usuario</button>);
    },
    renderContent: function () {
        if (this.state.savingUser) {
            return (<UserEdit user={this.state.user} />);
        }

        return (
            <ul className='users-list'>
                {this.getUsers()}
            </ul>
        );
    },
    toggleAddingUser: function () {
        var state = {};
        if (this.state.savingUser) {
            state.user = null;
        }

        state.savingUser = !this.state.savingUser;

        this.setState(state);
    },
    getUsers: function () {
        var users = this.props.users;
        if (users.size === 0) {
            return;
        }

        var usersArray = [];
        var self = this;
        var currentUserId = Parse.User.current().id;
        users.forEach(function (user) {
            if (user.id === currentUserId) {
                return;
            }

            usersArray.push(
                <li key={user.id}>
                    <span className='name'>{user.nombre + ' ' + user.apellido}</span>
                    <div className='buttons-wrapper'>
                        <button type='button' onClick={self.editUser.bind(self, user)}>Editar</button>
                        <button type='button' onClick={self.deleteUser.bind(self, user)}>Eliminar</button>
                    </div>
                </li>
            );
        });

        return usersArray;
    },
    editUser: function (user) {
        this.setState({savingUser: true, user: user});
    },
    deleteUser: function (user) {
        UsersActions.deleteUser(user.id);
    }
});

module.exports = UsersContent;
