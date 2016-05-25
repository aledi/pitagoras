'use strict';

require('./reportes.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// Reportes
// -----------------------------------------------------------------------------------------------

var Reportes = React.createClass({
    render: function () {
        return (
            <main className='reportes'>
                <h2>Reportes</h2>
            </main>
        );
    }
});

module.exports = Reportes;
