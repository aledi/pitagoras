'use strict';

require('./not-found.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// NotFound
// -----------------------------------------------------------------------------------------------

var NotFound = React.createClass({
    statics: {title: 'Not Found'},
    render: function () {
        return (
            <main className='not-found'>
                <h1>404 - Not Found</h1>
            </main>
        );
    }
});

module.exports = NotFound;
