'use strict';

require('./presentacion-demanda.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// PresentacionDemanda
// -----------------------------------------------------------------------------------------------

var PresentacionDemanda = React.createClass({
    render: function () {
        return (
            <div className='presentacion-demanda'>
                <label>Número de Registro</label>
                <input type='text' />
                <label>Juzgado</label>
                <input type='text' />
                <label>Fecha de Presentación</label>
                <input type='text' />
            </div>
        );
    }
});

module.exports = PresentacionDemanda;
