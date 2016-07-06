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
        var horaText = this.getHoraText(notificacion);

        return (
            <div className='notificacion'>
                <h3>{'Contrato ' + notificacion.numeroContrato}</h3>
                <label>Require recoger documentos el día &nbsp;</label>
                {this.renderBoldLabel(notificacion.formattedValues.fecha)}
                <label>{horaText}</label>
            </div>
        );
    },
    getHoraText: function (notificacion) {
        if (notificacion.hora) {
            return (' a las ');
        } else if (notificacion.horario) {
            return (' en un horario de ');
        }
    }
});

module.exports = NotificacionUno;
