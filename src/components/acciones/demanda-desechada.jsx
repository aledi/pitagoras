'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// DemandaDesechada
// -----------------------------------------------------------------------------------------------

var DemandaDesechada = React.createClass({
    render: function () {
        return (
            <div className='demanda-desechada'>
                <p>Motivo</p>
                <select>
                    <option>No coinciden los montos</option>
                    <option>No es la vía elegida (oral, ordinaria, ejecutiva, etc.)</option>
                    <option>Se declara incompetente de conocer el caso</option>
                    <option>Varios conceptos en un solo hecho</option>
                    <option>Se está cobrando doble interés</option>
                    <option>La demanda no es legible</option>
                </select>
                <p>¿Regresan documentos?</p>
                <div>
                    <input type='radio' id='si' />
                    <label htmlFor='si'>Sí</label>
                </div>
                <div>
                    <input type='radio' id='no' />
                    <label htmlFor='no'>No</label>
                </div>
                <div>
                    <label>Horario</label>
                    <input type='text' />
                </div>
            </div>
        );
    }
});

module.exports = DemandaDesechada;
