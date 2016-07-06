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
            <div className='notificacion'>
                <h3>{'Contrato ' + notificacion.numeroContrato}</h3>
                <p>{'No ha sido atendido desde el ' + notificacion.formattedValues.fecha}</p>
            </div>
        );
    }
});

module.exports = NotificacionCuatro;
