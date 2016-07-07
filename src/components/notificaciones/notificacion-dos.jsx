'use strict';

require('src/components/inicio/inicio.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Dos (fecha)
// -----------------------------------------------------------------------------------------------

var NotificacionDos = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>Require desahogo el día </span>
                <span className='bold'>{notificacion.formattedValues.fecha}</span>
            </div>
        );
    }
});

module.exports = NotificacionDos;
