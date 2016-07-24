'use strict';

require('./reportes-content.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var ReportesExtrajudiciales = require('./reportes-extrajudiciales');
var ReportesTabla = require('./reportes-tabla');

// -----------------------------------------------------------------------------------------------
// ReportesContent
// -----------------------------------------------------------------------------------------------

var ReportesContent = React.createClass({
    getInitialState: function () {
        return {showingReportesGenerales: true};
    },
    render: function () {
        return (
            <div className='reportes-content'>
                <span className='side-button right' onClick={this.toggleReportes}>
                    {'Mostrar Reportes' + (this.state.showingReportesGenerales ? ' Extrajudiciales' : ' Generales')}
                </span>
                {this.renderReportes()}
            </div>
        );
    },
    renderReportes: function () {
        if (this.state.showingReportesGenerales) {
            return (<ReportesTabla reportes={this.props.reportes} />);
        }

        return (<ReportesExtrajudiciales reportes={this.props.reportes} />);
    },
    toggleReportes: function () {
        this.setState({showingReportesGenerales: !this.state.showingReportesGenerales});
    }
});

module.exports = ReportesContent;
