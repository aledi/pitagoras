'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ReportesActions = require('src/actions/reportes-actions');
var ReportesStore = require('src/stores/reportes-store');

var ReportesTabla = require('./reportes-tabla');

// -----------------------------------------------------------------------------------------------
// Reportes
// -----------------------------------------------------------------------------------------------

class Reportes extends React.Component {
    static getStores () {
        return [ReportesStore];
    }

    static calculateState (prevState, props) {
        var reportes = ReportesStore.get('reportes');

        return {
            loading: reportes.size === 0 && ReportesStore.get('fetching'),
            error: reportes.size === 0 ? ReportesStore.get('fetchError') : null,
            reportes: reportes
        };
    }

    componentWillMount () {
        ReportesActions.fetchReportes();
    }

    render () {
        return (
            <main className='reportes'>
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
            return (<ReportesTabla reportes={this.state.reportes} />);
        }
    }
}

module.exports = Flux.Container.create(Reportes, {withProps: true});
