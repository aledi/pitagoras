'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// Emplazamiento
// -----------------------------------------------------------------------------------------------

var Emplazamiento = React.createClass({
    render: function () {
        return (
            <div className='emplazamiento'>
                <select>
                    <option>No vive en el domicilio</option>
                    <option>Se niega a recibir demanda</option>
                    <option>Se realizó exitosamente</option>
                </select>
            </div>
        );
    }
});

module.exports = Emplazamiento;
