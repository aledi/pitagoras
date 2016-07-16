'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Tres (cita: fecha, lugar, nombreActuario, telefonoActuario)
// -----------------------------------------------------------------------------------------------

var NotificacionTres = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>Cuenta con una cita el día </span>
                <span className='bold'>{notificacion.formattedValues.cita.fecha}</span>
                <span> en </span>
                <span className='bold'>{notificacion.cita.lugar}</span>
                <span> con el actuario </span>
                <span className='bold'>{notificacion.cita.nombreActuario}</span>
                <span> con teléfono </span>
                <span className='bold'>{notificacion.cita.telefonoActuario}</span>
            </div>
        );
    }
});

module.exports = NotificacionTres;
