'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Reporte
// -----------------------------------------------------------------------------------------------

var ReporteDetalle = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        console.log(props);
    },
    render: function () {
        return (
            <div>Reporte</div>
        );
    }
});

module.exports = ReporteDetalle;
