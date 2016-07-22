'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Flux = require('flux/utils');

var ReportesActions = require('src/actions/reportes-actions');
var ReportesStore = require('src/stores/reportes-store');

var Reporte = require('./reporte');
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
            reportes: reportes,
            reporte: reportes.get(props.params.id)
        };
    }

    componentWillMount () {
        ReportesActions.fetchReportes();
    }

    render () {
        if (this.props.params.id) {
            return (
                <main className='reportes'>
                    <Reporte reporte={this.state.reporte} id={this.props.params.id} />
                </main>
            );
        }

        return (
            <main className='reportes'>
                <ReportesTabla reportes={this.state.reportes} />
            </main>
        );
    }
}

module.exports = Flux.Container.create(Reportes, {withProps: true});
