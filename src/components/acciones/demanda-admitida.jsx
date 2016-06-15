'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// DemandaAdmitida
// -----------------------------------------------------------------------------------------------

var DemandaAdmitida = React.createClass({
    render: function () {
        return (
            <div className='demanda-admitida'>
                <p>Tipo de Juicio</p>
                <div>
                    <input type='radio' id='oral' />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input type='radio' id='ejecutiva' />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>

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

module.exports = DemandaAdmitida;
