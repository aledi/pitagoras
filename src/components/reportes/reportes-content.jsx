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
                <button type='button' className='top-right export' onClick={this.exportTable}>Exportar Reportes</button>
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
    },
    exportTable: function () {
        var tipoReportes = this.state.showingReportesGenerales ? 'reportes' : 'extrajudiciales';
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var table = document.getElementById(tipoReportes);
        var ctx = {
            worksheet: tipoReportes,
            table: table.innerHTML
        };

        document.getElementById('dlink').href = uri + this.base64(this.format(template, ctx));
        document.getElementById('dlink').download = tipoReportes + '.xls';
        document.getElementById('dlink').click();
    },
    base64: function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    },
    format: function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    }
});

module.exports = ReportesContent;
