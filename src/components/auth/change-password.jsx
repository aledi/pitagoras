'use strict';

require('./not-found.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// NotFound
// -----------------------------------------------------------------------------------------------

var ChangePassword = React.createClass({
    getInitialState: function () {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
    },
    render: function () {
        return (
            <main className='change-password'>
                <form onSubmit={this.changePassword}>
                    <input type='text' value={this.state.currentPassword} onChange={this.handleChange.bind(this, 'currentPassword')} />
                    <input type='text' value={this.state.newPassword} onChange={this.handleChange.bind(this, 'newPassword')} />
                    <input type='text' value={this.state.confirmPassword} onChange={this.handleChange.bind(this, 'confirmPassword')} />
                </form>
            </main>
        );
    },
    handleChange: function (key, event) {
        var state = {};
        state[key] = event.target.value;

        this.setState(state);
    },
    changePassword: function () {
        if (this.state.newPassword !== this.state.confirmPassword) {
            return;
        }

        Parse.User.current().setPassword(this.state.newPassword);
        Parse.User.current().save().then(this.handleSuccess).catch(this.handleError);
    },
    handleSuccess: function (user) {

    },
    handleError: function (error) {

    }
});

module.exports = ChangePassword;
