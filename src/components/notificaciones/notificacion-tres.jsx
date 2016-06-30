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
            <div className='notificacion'>
                <p>
                    {'El contrato ' + notificacion.numeroContrato + ' cuenta con una cita el día ' +
                    notificacion.formattedValues.cita.fecha + ' en ' + notificacion.cita.lugar +
                    ' con el actuario ' + notificacion.cita.nombreActuario + ' con teléfono ' + notificacion.cita.telefonoActuario}
                </p>
            </div>
        );
    }
});

module.exports = NotificacionTres;
