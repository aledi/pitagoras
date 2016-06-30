'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Uno (fecha y horario)
// -----------------------------------------------------------------------------------------------

var NotificacionUno = React.createClass({
    render: function () {
        var notificacion = this.props.notificacion;
        var horaText = this.getHoraText(notificacion);

        return (
            <div className='notificacion'>
                <p>{'El contrato ' + notificacion.numeroContrato + ' require recoger documentos el día ' + notificacion.formattedValues.fecha + horaText}</p>
            </div>
        );
    },
    getHoraText: function (notificacion) {
        if (notificacion.hora) {
            return (' a las ' + notificacion.hora);
        } else if (notificacion.horario) {
            return (' en un horario de ' + notificacion.formattedValues.horario);
        }
    }
});

module.exports = NotificacionUno;
