'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosStore = require('src/stores/contratos-store');

var Notificaciones = require('src/components/notificaciones/notificaciones');

// -----------------------------------------------------------------------------------------------
// Inicio
// -----------------------------------------------------------------------------------------------

class Inicio extends React.Component {
    static getStores () {
        return [ContratosStore];
    }

    static calculateState (prevState, props) {
        var notificaciones = ContratosStore.get('notificaciones');

        return {
            loading: notificaciones.size === 0 && ContratosStore.get('fetching'),
            error: notificaciones.size === 0 ? ContratosStore.get('fetchError') : null,
            notificaciones: notificaciones
        };
    }

    render () {
        return (
            <main className='inicio'>
                <Notificaciones notificaciones={this.state.notificaciones} />
            </main>
        );
    }
}

module.exports = Flux.Container.create(Inicio, {withProps: true});
