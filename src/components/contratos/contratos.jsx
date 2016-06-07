'use strict';

require('./contratos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosActions = require('src/actions/contratos-actions');
var ContratosStore = require('src/stores/contratos-store');

var ContratosLista = require('./contratos-lista');
var Contrato = require('./contrato');

// -----------------------------------------------------------------------------------------------
// Contratos
// -----------------------------------------------------------------------------------------------

class Contratos extends React.Component {
    static getStores () {
        return [ContratosStore];
    }

    static calculateState (prevState, props) {
        var contratos = ContratosStore.get('contratos');

        return {
            loading: contratos.size === 0 && ContratosStore.get('fetching'),
            error: contratos.size === 0 ? ContratosStore.get('fetchError') : null,
            contratos: contratos,
            contrato: contratos.get(props.params.id)
        };
    }

    componentWillMount () {
        ContratosActions.fetchContratos();
    }

    render () {
        if (this.props.params.id) {
            return (
                <main className='contratos'>
                    <Contrato contrato={this.state.contrato} />
                </main>
            );
        }
        return (
            <main className='contratos'>
                <ContratosLista contratos={this.state.contratos} />
            </main>
        );
    }
}

module.exports = Flux.Container.create(Contratos, {withProps: true});
