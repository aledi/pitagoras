'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// DiligenciaEmbargo
// -----------------------------------------------------------------------------------------------

var DiligenciaEmbargo = React.createClass({
    render: function () {
        return (
            <div className='diligencia-embargo'>
                <select>
                    <option>No encontró el domicilio</option>
                    <option>El domicilio es incorrecto</option>
                    <option>La persona no vive ahí</option>
                    <option>No abre nadie en el domicilio</option>
                    <option>Fallecimiento</option>
                    <option>Se realizó exitosamente</option>
                </select>
            </div>
        );
    }
});

module.exports = DiligenciaEmbargo;
