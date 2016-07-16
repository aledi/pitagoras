'use strict';

require('./contratos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosStore = require('src/stores/contratos-store');

var Contrato = require('./contrato');
var ContratosTabla = require('./contratos-tabla');

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

    render () {
        if (this.props.params.id) {
            return (
                <main className='contratos'>
                    <Contrato contrato={this.state.contrato} id={this.props.params.id} />
                </main>
            );
        }

        return (
            <main className='contratos'>
                {this.renderContent()}
            </main>
        );
    }

    renderContent () {
        if (this.state.loading) {
            return (<h2>Cargando...</h2>);
        } else if (this.state.error) {
            return (<div className='error'>Hubo un error. Favor de intentar de nuevo.</div>);
        } else {
            return (<ContratosTabla contratos={this.state.contratos} />);
        }
    }
}

module.exports = Flux.Container.create(Contratos, {withProps: true});
