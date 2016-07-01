'use strict';

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
            <div className='notificacion'>
                <p>{'El contrato ' + notificacion.numeroContrato + ' no ha sido atendido desde el ' + notificacion.formattedValues.fecha}</p>
            </div>
        );
    }
});

module.exports = NotificacionCuatro;
