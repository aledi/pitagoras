'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// ReportesTabla
// -----------------------------------------------------------------------------------------------

var tableMinWidth = '8250px';

var ReportesExtrajudiciales = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    componentDidMount: function () {
        document.getElementById('table-wrapper-reportes').focus();
    },
    render: function () {
        return (
            <div id='table-wrapper-reportes' className='reportes-table table-wrapper' tabIndex='0' onKeyUp={this.handleKeyUp}>
                <div className='table-header-wrapper' style={{minWidth: tableMinWidth}}>
                    <table>
                        {this.renderHeader()}
                    </table>
                </div>
                {this.renderTableBodyWrapper()}
                <a id='dlink' style={{display: 'none'}} />
            </div>
        );
    },
    renderTableBodyWrapper: function () {
        return (
            <div id='table-body-wrapper-reportes' className='table-body-wrapper' style={{minWidth: tableMinWidth}} tabIndex='1'>
                {this.renderTableBody()}
            </div>
        );
    },
    renderTableBody: function () {
        return (
            <table className='table-body' id='reportes'>
                {this.renderHeader('fake-header')}
                <tbody>
                    {this.renderReportes()}
                </tbody>
            </table>
        );
    },
    renderHeader: function (className) {
        return (
            <thead className={className}>
                <tr className='header'>
                    <th style={{width: '250px'}}>
                        <span>Número de Contrato</span>
                    </th>
                    <th style={{width: '350px'}}>
                        <span>Nombre</span>
                    </th>
                    <th style={{width: '250px'}}>
                        <span>Liquidación</span>
                    </th>
                    <th style={{width: '350px'}}>
                        <span>Convenio</span>
                    </th>
                    <th style={{width: '250px'}}>
                        <span>Valor en Libros</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Fecha REPO</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Monto de Venta</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Fecha de Venta</span>
                    </th>
                </tr>
            </thead>
        );
    },
    renderReportes: function () {
        if (!this.props.reportes) {
            return;
        }

        var reportes = [];

        this.props.reportes.forEach(function (reporte) {
            reportes.push(
                <tr className='content-row' key={reporte.id}>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.numeroContrato}</span></td>
                    <td style={{width: '350px', textAlign: 'left'}}><span>{reporte.nombre}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.liquidacion}</span></td>
                    <td style={{width: '350px', textAlign: 'left'}}><span>{reporte.convenio}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.valorLibros}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaRepo}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.montoVenta}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaVenta}</span></td>
                </tr>
            );
        });

        return reportes;
    },
    handleKeyUp: function (event) {
        event.persist();

        // Left & right arrow
        if (event.keyCode === 37 || event.keyCode === 39) {
            document.getElementById('table-wrapper-reportes').focus();
        }

        // Up & down arrow
        if (event.keyCode === 38 || event.keyCode === 40) {
            document.getElementById('table-body-wrapper-reportes').focus();
        }
    }
});

module.exports = ReportesExtrajudiciales;
