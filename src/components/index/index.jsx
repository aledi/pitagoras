'use strict';

require('./index.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// Index
// -----------------------------------------------------------------------------------------------

var Index = React.createClass({
    render: function () {
        return (
            <main className='index'>
                <h2>PITAGORAS</h2>
                <button type='button' onClick={this.signOut}>Cerrar sesión</button>
            </main>
        );
    },
    signOut: function (event) {
        event.preventDefault();

        Parse.User.logOut().then(function () {
            window.location = '/signin';
        });
    }
});

module.exports = Index;
