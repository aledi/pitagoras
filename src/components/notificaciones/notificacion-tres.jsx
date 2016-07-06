'use strict';

require('src/components/inicio/inicio.scss');

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
                <h3>{'Contrato ' + notificacion.numeroContrato}</h3>
                <p>
                    {'Cuenta con una cita el día ' +
                    notificacion.formattedValues.cita.fecha + ' en ' + notificacion.cita.lugar +
                    ' con el actuario ' + notificacion.cita.nombreActuario + ' con teléfono ' + notificacion.cita.telefonoActuario}
                </p>
            </div>
        );
    }
});

module.exports = NotificacionTres;
