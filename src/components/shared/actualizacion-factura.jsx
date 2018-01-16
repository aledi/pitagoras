'use strict';

require('./actualizacion-factura.scss');

var React = require('react');
var classNames = require('classnames');

var ContratosActions = require('src/actions/contratos-actions');
var ContratosStore = require('src/stores/contratos-store');

var ActualizacionFactura = React.createClass({
    contextTypes: {
        hideModal: React.PropTypes.func,
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            numeroFactura: '',
            contratos: ''
        };
    },
    componentDidMount: function () {
        this.storeListener = ContratosStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.storeListener.remove();
    },
    onChange: function () {
        var savingMultiple = ContratosStore.get('savingMultiple');
        var saveErrorMultiple = ContratosStore.get('saveErrorMultiple');

        // Success
        if (this.state.savingMultiple && !savingMultiple && !saveErrorMultiple) {

            this.setState({
                feedbackText: 'Los contratos se han actualizado',
                numeroFactura: '',
                contratos: '',
                savingMultiple: false,
                saveErrorMultiple: false
            });

            return;
        }

        // Error
        if (this.state.savingMultiple && !savingMultiple && saveErrorMultiple) {
            this.setState({
                feedbackText: 'Error al actualizar los contratos',
                savingMultiple: false,
                saveErrorMultiple: true
            });

            return;
        }

        this.setState({savingMultiple: savingMultiple});
    },
    render: function () {
        var invalidInputs = this.invalidInputs();

        return (
            <div className='backdrop' id='backdrop'>
                <div className='modal-wrapper'>
                    <div className='actualizacion-modal'>
                        <button type='button' className='close' onClick={this.props.onClose}>Cerrar</button>
                        <label>Introduzca el número de factura a aplicar.</label>
                        <input type='text' value={this.state.numeroFactura} onChange={this.handleChange.bind(this, 'numeroFactura')} placeholder='000000' />
                        <label>Introduzca los números de contratos, separados por coma, espacio o punto y coma.</label>
                        <textarea type='text' value={this.state.contratos} onChange={this.handleChange.bind(this, 'contratos')} placeholder='123456, 654321, 019283' />
                        <button type='button' onClick={this.handleClick} disabled={invalidInputs}>Actualizar</button>
                        {this.renderFeedbackText()}
                    </div>
                </div>
            </div>
        );
    },
    invalidInputs: function () {
        return (!this.state.numeroFactura || !this.state.numeroFactura.trim() || !this.state.contratos || !this.state.contratos.trim());
    },
    renderFeedbackText: function () {
        if (!this.state.feedbackText) {
            return;
        }

        return (<p className={classNames('feedback-text', {success: !this.state.saveErrorMultiple}, {error: this.state.saveErrorMultiple})}>{this.state.feedbackText}</p>);
    },
    handleChange: function (key, event) {
        var state = {};
        state[key] = event.target.value;
        state.feedbackText = '';

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

        if (!contratos.length) {
            this.setState({feedbackText: 'No se encontraron los contratos especificados.'});
            return;
        }

        for (var i = 0; i < contratos.length; i++) {
            contratos[i].reporte.numeroFactura = this.state.numeroFactura;
        }

        ContratosActions.saveContratos(contratos);
    }
});

module.exports = ActualizacionFactura;
