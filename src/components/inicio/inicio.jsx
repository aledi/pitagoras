'use strict';

require('./inicio.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ContratosStore = require('src/stores/contratos-store');
var Notifications = require('src/components/notifications/notifications');

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
            loading: notifications.size === 0 && ContratosStore.get('fetching'),
            error: notifications.size === 0 ? ContratosStore.get('fetchError') : null,
            notifications: notifications,
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
            return (<Notifications notifications={this.state.notifications} newUser={this.state.newUser} />);
        }
    }
}

module.exports = Flux.Container.create(Inicio, {withProps: true});
