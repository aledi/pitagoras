'use strict';

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Dos (fecha)
// -----------------------------------------------------------------------------------------------

var NotificacionDos = React.createClass({
    render: function () {
        return (
            <div>
                <span>Require desahogo el día </span>
                <span className='bold'>{this.props.notificacion.formattedValues.fecha}</span>
            </div>
        );
    }
});

module.exports = NotificacionDos;
