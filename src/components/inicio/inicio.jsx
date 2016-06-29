'use strict';

require('./inicio.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosActions = require('src/actions/contratos-actions');
var ContratosStore = require('src/stores/contratos-store');

// -----------------------------------------------------------------------------------------------
// Inicio
// -----------------------------------------------------------------------------------------------

class Inicio extends React.Component {
    static getStores () {
        return [ContratosStore];
    }

    static calculateState (prevState, props) {
        var notifications = ContratosStore.get('notifications');

        return {
            notifications: notifications
        };
    }

    componentWillMount () {
        ContratosActions.fetchContratos();
    }

    render () {
        console.log(this.state.notifications);
        return (
            <main className='inicio'>
                <h2>Inicio</h2>
            </main>
        );
    }
}

module.exports = Flux.Container.create(Inicio, {withProps: true});
