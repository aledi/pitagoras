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
        return (
            <div>
                <span>{'Require recoger documentos el día '}</span>
                <span className='bold'>{this.props.notificacion.formattedValues.fecha}</span>
                <span>{' en un horario de '}</span>
                <span className='bold'>{this.props.notificacion.formattedValues.horario}</span>
            </div>
        );
    }
});

module.exports = NotificacionUno;
