'use strict';

require('./search.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var fuzzy = require('fuzzy');

// -----------------------------------------------------------------------------------------------
// ActualizacionFactura
// -----------------------------------------------------------------------------------------------

var ActualizacionFactura = React.createClass({
    contextTypes: {
        hideModal: React.PropTypes.func,
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return this.getState();
    },
    onChange: function () {
        this.setState(this.getState());
    },
    getState: function () {
        return {
            numeroFactura: ''
        };
    },
    render: function () {
        return (
            <div className='backdrop' id='backdrop'>
                <div className='modal-wrapper'>
                    <div className='modal'>
                        <button type='button' onClick={this.props.onClose}>Cerrar</button>
                        <p>Introduzca el número de factura a aplicar</p>
                        <input type='text' value={this.state.numeroFactura} onChange={this.handleChange} placeholder='000000' />
                    </div>
                </div>
            </div>
        );
    },
    handleChange: function (event) {
        
    }
});

module.exports = ActualizacionFactura;
