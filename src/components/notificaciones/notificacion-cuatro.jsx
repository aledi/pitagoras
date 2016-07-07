'use strict';

require('src/components/inicio/inicio.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Cuatro (Inactividad)
// -----------------------------------------------------------------------------------------------

var NotificacionCuatro = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>No ha sido atendido desde el </span>
                <span className='bold'>{notificacion.formattedValues.fecha}</span>
            </div>
        );
    }
});

module.exports = NotificacionCuatro;
