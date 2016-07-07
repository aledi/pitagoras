'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var NotificacionesMixin = require('./notificaciones-mixin');

// -----------------------------------------------------------------------------------------------
// Notificacion Uno (fecha y horario)
// -----------------------------------------------------------------------------------------------

var NotificacionUno = React.createClass({
    mixins: [NotificacionesMixin],
    render: function () {
        var notificacion = this.props.notificacion;

        return (
            <div>
                <span>{'Require recoger documentos el día '}</span>
                <span className='bold'>{notificacion.formattedValues.fecha}</span>
                <span>{' en un horario de '}</span>
                <span className='bold'>{notificacion.formattedValues.horario}</span>
            </div>
        );
    }
});

module.exports = NotificacionUno;
