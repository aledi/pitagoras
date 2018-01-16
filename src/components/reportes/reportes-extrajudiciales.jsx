'use strict';

var React = require('react');

var AccionRecord = require('src/records/accion');
var tableMinWidth = '4050px';

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
            <table className='table-body' id='extrajudiciales'>
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
                    <th style={{width: '200px'}}>
                        <span>Resultado de Gestión</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Modo de Contacto</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Persona Contactada</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Lugar de Contacto</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Monto Promesado</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Fecha de Seguimiento</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Hora de Seguimiento</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Recordatorio</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Liquidación</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Convenio</span>
                    </th>
                    <th style={{width: '200px'}}>
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
                    <th style={{width: '250px'}}>
                        <span>Etapa Actual</span>
                    </th>
                    <th style={{width: '400px'}}>
                        <span>Comentarios</span>
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
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.resultadoGestion}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.modoContacto}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.personaContactada}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.lugarContacto}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.montoPromesado}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaSeguimiento}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.horaSeguimiento}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.recordatorio}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.liquidacion}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.convenio}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.valorLibros}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaRepo}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.montoVenta}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaVenta}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.etapaActualExtrajudicial ? AccionRecord.ACCIONES_TYPES[reporte.etapaActualExtrajudicial] : ''}</span></td>
                    <td style={{width: '400px', textAlign: 'left'}}><span>{reporte.comentariosExtrajudicial}</span></td>
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
