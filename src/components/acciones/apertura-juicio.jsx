'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// AperturaJuicio
// -----------------------------------------------------------------------------------------------

var AperturaJuicio = React.createClass({
    render: function () {
        return (
            <div className='apertura-juicio'>
                <p>Tipo de Juicio</p>
                <div>
                    <input type='radio' id='oral' />
                    <label htmlFor='oral'>Oral Mercantil</label>
                </div>
                <div>
                    <input type='radio' id='ejecutiva' />
                    <label htmlFor='ejecutiva'>Ejecutiva Mercantil</label>
                </div>
            </div>
        );
    }
});

module.exports = AperturaJuicio;
