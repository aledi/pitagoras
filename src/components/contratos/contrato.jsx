'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var AccionesActions = require('src/actions/acciones-actions');
var AccionesStore = require('src/stores/acciones-store');
var ContratoDetalle = require('src/components/contratos/contrato-detalle');

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
            acciones: AccionesStore.get(props.id),
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
                acciones={this.state.acciones}
                savingAccion={this.state.savingAccion}
                saveError={this.state.saveError} />
        );
    }
}

module.exports = Flux.Container.create(Contrato, {withProps: true});
