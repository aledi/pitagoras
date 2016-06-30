'use strict';

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
            <div className='notificacion'>
                <p>{'El contrato ' + notificacion.numeroContrato + ' require desahogo el día ' + notificacion.formattedValues.fecha}</p>
            </div>
        );
    }
});

module.exports = NotificacionDos;
