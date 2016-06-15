'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// AcuerdoDemanda
// -----------------------------------------------------------------------------------------------

var AcuerdoDemanda = React.createClass({
    render: function () {
        return (
            <div className='acuerdo-demanda'>
                <p>Resultado del acuerdo</p>
                <div>
                    <input type='radio' id='desecha' />
                    <label htmlFor='desecha'>Desecha</label>
                </div>
                <div>
                    <input type='radio' id='previene' />
                    <label htmlFor='previene'>Previene</label>
                </div>
                <div>
                    <input type='radio' id='admite' />
                    <label htmlFor='admite'>Admite</label>
                </div>
            </div>
        );
    }
});

module.exports = AcuerdoDemanda;
