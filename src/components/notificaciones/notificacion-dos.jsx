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
            <div className='notificacion'>
                <h3>{'Contrato ' + notificacion.numeroContrato}</h3>
                <p>{'Require desahogo el día ' + notificacion.formattedValues.fecha}</p>
            </div>
        );
    }
});

module.exports = NotificacionDos;
