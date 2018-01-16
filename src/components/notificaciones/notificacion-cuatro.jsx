'use strict';

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Cuatro (Inactividad)
// -----------------------------------------------------------------------------------------------

var NotificacionCuatro = React.createClass({
    render: function () {
        return (
            <div>
                <span>No ha sido atendido desde el </span>
                <span className='bold'>{this.props.notificacion.formattedValues.fecha}</span>
            </div>
        );
    }
});

module.exports = NotificacionCuatro;
