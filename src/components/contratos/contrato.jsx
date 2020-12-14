'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var AccionesActions = require('../../actions/acciones-actions');
var AccionesStore = require('../../stores/acciones-store');
var ContratoDetalle = require('./contrato-detalle');

// -----------------------------------------------------------------------------------------------
// Contrato
// -----------------------------------------------------------------------------------------------

class Contrato extends React.Component {
    static getStores () {
        return [AccionesStore];
    }

    static calculateState (prevState, props) {
        return {
            contrato: props.contrato,
            accionesForContrato: AccionesStore.get(props.id),
            savingAccion: AccionesStore.get('saving'),
            saveError: AccionesStore.get('saveError')
        };
    }

    componentWillMount () {
        AccionesActions.fetchAcciones(this.props.id);
    }

    render () {
        return (
            <ContratoDetalle
                contrato={this.state.contrato}
                accionesForContrato={this.state.accionesForContrato}
                savingAccion={this.state.savingAccion}
                saveError={this.state.saveError} />
        );
    }
}

module.exports = Flux.Container.create(Contrato, {withProps: true});
