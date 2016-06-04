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
            contratos: contratos
        };
    }

    componentWillMount () {
        ContratosActions.fetchContratos();
    }

    render () {
        return (
            <main className='contratos'>
                <ContratosLista contratos={this.state.contratos} />
            </main>
        );
    }
}

module.exports = Flux.Container.create(Contratos, {withProps: true});
