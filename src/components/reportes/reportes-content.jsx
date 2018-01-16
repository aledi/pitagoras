'use strict';

require('./reportes-content.scss');

var React = require('react');

var ReportesExtrajudiciales = require('./reportes-extrajudiciales');
var ReportesTabla = require('./reportes-tabla');

var ReportesContent = React.createClass({
    getInitialState: function () {
        return {showingReportesGenerales: true};
    },
    render: function () {
        return (
            <div className='reportes-content'>
                <div className='title-wrapper'>
                    <p> {'Reporte' + (this.state.showingReportesGenerales ? ' Judicial' : ' Extrajudicial')} </p>
                </div>
                <div className='buttons-wrapper'>
                   <button className='right-button' onClick={this.toggleReportes}>
                       {'Mostrar Reporte' + (this.state.showingReportesGenerales ? ' Extrajudicial' : ' Judicial')}
                   </button>
                   <button type='button' className='right-button export' onClick={this.exportTable}>Exportar</button>
                </div>
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
        var date = new Date();
        var tipoReportes = this.state.showingReportesGenerales ? 'reportes' : 'extrajudiciales';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var table = document.getElementById(tipoReportes);
        var ctx = {
            worksheet: tipoReportes,
            table: table.innerHTML
        };
        var myBlob = new Blob([this.format(template, ctx)], {type: 'application/vnd.ms-excel'});
        var url = window.URL.createObjectURL(myBlob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'reporte-' + (tipoReportes === 'reportes' ? 'judicial' : 'extrajudicial') + '-pitagoras-' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + '.xls';
        a.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
        }, 0);
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
