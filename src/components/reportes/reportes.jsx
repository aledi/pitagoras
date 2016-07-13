'use strict';

require('./reportes.scss');

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
                <ReportesTabla reportes={this.state.reportes} />
            </main>
        );
    }
}

module.exports = Flux.Container.create(Reportes, {withProps: true});
