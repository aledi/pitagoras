'use strict';

require('./agregar-contrato.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var Contrato = Parse.Object.extend("Contrato");

// -----------------------------------------------------------------------------------------------
// Agregar Contrato
// -----------------------------------------------------------------------------------------------

var AgregarContrato = React.createClass({
    getInitialState: function () {
        return {
            numeroContrato: null,
            plazo: null,
            monto: null,
            tasa: null,
            contracts: null
        };
    },
    componentWillMount: function () {
        this.loadClients();
    },
    render: function () {

        console.log(this.state.contracts)
        return (
            <div className='addcontract-wrapper'>
                <h2>Agregar Contrato</h2>
                <form onSubmit={this.handleAddContract}>
                    <label>Número de Contrato</label>
                    <input type='text' value={this.state.numeroContrato} onChange={this.handleChange.bind(this, 'numeroContrato')} />
                    <label>Plazo</label>
                    <input type='text' value={this.state.plazo} onChange={this.handleChange.bind(this, 'plazo')} />
                    <label>Monto</label>
                    <input type='text' value={this.state.monto} onChange={this.handleChange.bind(this, 'monto')} />
                    <label>Tasa</label>
                    <input type='text' value={this.state.tasa} onChange={this.handleChange.bind(this, 'tasa')} />
                    <label>Cliente</label>
                    <select>{this.renderClientes()}</select>
                    <button type='submit'>Agregar Contrato</button>
                </form>
            </div>
        );
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state[propertyName] = event.target.value;

        this.setState(state);
    },
    handleAddContract: function (event) {
        event.preventDefault();

        var newContract = new Contrato();

        newContract.save({
            numeroContrato: this.state.numeroContrato,
            plazo: Number(this.state.plazo),
            monto: Number(this.state.monto),
            tasa: Number(this.state.tasa)
        }, {
            success: function(newContract) {
                alert('New object created with objectId: ' + newContract.id);
            },
            error: function(newContract, error) {
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    },
    loadClients: function () {
        var query = new Parse.Query(Contrato);
        var self = this;
        query.find({
            success: function(contracts) {
                // alert(contracts.length);

                self.setState({contracts: contracts});
            },
            error: function(object, error) {
                alert(error);
            }
        });
    },
    renderClientes: function () {
        console.log(this.state.contracts)
        if (!this.state.contracts) {
            return;
        }

        return (this.state.contracts.map(function (elemento, index) {
            console.log(elemento.get('numeroContrato'));
            return (<option value={elemento.get('numeroContrato')}>{elemento.get('numeroContrato')}</option>);
        }));
    }
});

module.exports = AgregarContrato;
