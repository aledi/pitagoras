'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var UsersActions = require('src/actions/users-actions');
var UsersStore = require('src/stores/users-store');

var UsersContent = require('./users-content');

// -----------------------------------------------------------------------------------------------
// Users
// -----------------------------------------------------------------------------------------------

class Users extends React.Component {
    static getStores () {
        return [UsersStore];
    }

    static calculateState (prevState, props) {
        var users = UsersStore.get('users');

        return {
            loading: users.size === 0 && UsersStore.get('fetching'),
            error: users.size === 0 ? UsersStore.get('fetchError') : null,
            users: users
        };
    }

    componentWillMount () {
        UsersActions.fetchUsers();
    }

    render () {
        return (
            <main className='users'>
                {this.renderContent()}
            </main>
        );
    }

    renderContent () {
        if (this.state.loading) {
            return (<h2>Cargando...</h2>);
        } else if (this.state.error) {
            return (<div className='error'>Hubo un error. Favor de intentar de nuevo.</div>);
        } else {
            return (<UsersContent users={this.state.users} />);
        }
    }
}

module.exports = Flux.Container.create(Users, {withProps: true});
