'use strict';

require('./actualizacion-factura.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ContratosActions = require('src/actions/contratos-actions');

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
            numeroFactura: '',
            contratos: ''
        };
    },
    render: function () {
        return (
            <div className='backdrop' id='backdrop'>
                <div className='modal-wrapper'>
                    <div className='modal'>
                        <button type='button' onClick={this.props.onClose}>Cerrar</button>
                        <p>Introduzca el número de factura a aplicar</p>
                        <input type='text' value={this.state.numeroFactura} onChange={this.handleChange.bind(this, 'numeroFactura')} placeholder='000000' />
                        <p>Introduzca los números de contratos, separados por coma</p>
                        <textarea type='text' value={this.state.contratos} onChange={this.handleChange.bind(this, 'contratos')} placeholder='123456, 654321, 019283' />
                        <button type='button' onClick={this.handleClick}>Actualizar</button>
                    </div>
                </div>
            </div>
        );
    },
    handleChange: function (key, event) {
        var state = {};
        state[key] = event.target.value;

        this.setState(state);
    },
    handleClick: function () {
        var contratosToUpdate = this.state.contratos.split(/[\s,;]+/);
        var contratosById = this.props.contratos;
        var contratos = [];

        contratosById.forEach(function (contrato) {
            if (contratosToUpdate.indexOf(contrato.numeroContrato) === -1) {
                return;
            }

            contratos.push(contrato.toEditable());
        });

        for (var i = 0; i < contratos.length; i++) {
            contratos[i].reporte.numeroFactura = this.state.numeroFactura;
            ContratosActions.saveContrato(contratos[i]);
        }
    }
});

module.exports = ActualizacionFactura;
