'use strict';

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Notificacion Uno (fecha y horario)
// -----------------------------------------------------------------------------------------------

var NotificacionUno = React.createClass({
    render: function () {
        return (
            <div>
                <span>{'Require recoger documentos el día '}</span>
                <span className='bold'>{this.props.notificacion.formattedValues.fecha}</span>
                {this.renderHours()}
            </div>
        );
    },
    renderHours: function () {
        var horario = this.props.notificacion.formattedValues.horario;
        if (!horario) {
            return;
        }

        return (
            <span>
                <span>{' en un horario de '}</span>
                <span className='bold'>{this.props.notificacion.formattedValues.horario}</span>
            </span>
        );
    }
});

module.exports = NotificacionUno;
