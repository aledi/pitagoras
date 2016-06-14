'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// DemandaPrevenida
// -----------------------------------------------------------------------------------------------

var DemandaPrevenida = React.createClass({
    render: function () {
        return (
            <div className='demanda-prevenida'>
                <p>¿Desahogar?</p>
                <div>
                    <input type='radio' id='si' />
                    <label htmlFor='si'>Si</label>
                </div>
                <div>
                    <input type='radio' id='no' />
                    <label htmlFor='no'>No</label>
                </div>
            </div>
        );
    }
});

module.exports = DemandaPrevenida;
