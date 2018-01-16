'use strict';

var React = require('react');

var NotFound = React.createClass({
    render: function () {
        return (
            <main className='not-found'>
                <h2>La página que está buscando, no se ha encontrado.</h2>
            </main>
        );
    }
});

module.exports = NotFound;
