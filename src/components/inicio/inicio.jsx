'use strict';

require('./inicio.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosStore = require('../../stores/contratos-store');
var Notificaciones = require('../notificaciones/notificaciones');

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
            notificaciones: notificaciones,
            newUser: props.location.state ? props.location.state.newUser : false
        };
    }

    render () {
        return (
            <main className='inicio'>
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
            return (<Notificaciones notificaciones={this.state.notificaciones} newUser={this.state.newUser} />);
        }
    }
}

module.exports = Flux.Container.create(Inicio, {withProps: true});
