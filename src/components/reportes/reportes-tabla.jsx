'use strict';

require('./reportes-tabla.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

// -----------------------------------------------------------------------------------------------
// ReportesTabla
// -----------------------------------------------------------------------------------------------

var tableMinWidth = '5200px';

var ReportesTabla = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    render: function () {
        return (
            <div className='reportes-table table-wrapper'>
                <div className='table-header-wrapper' style={{minWidth: tableMinWidth}}>
                    <table>
                        <thead>
                            <tr className='header'>
                                <th style={{width: '250px'}}>
                                    <span>Número de Contrato</span>
                                </th>
                                <th style={{width: '350px'}}>
                                    <span>Nombre</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Asignación</span>
                                </th>
                                <th style={{width: '100px'}}>
                                    <span>Paquete Legal</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha Paquete Legal Recibido</span>
                                </th>
                                <th style={{width: '150px'}}>
                                    <span>Certificación Contable</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Visita</span>
                                </th>
                                <th style={{width: '150px'}}>
                                    <span>Resultado de Visita</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Fecha de Presentación de Demanda</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Expediente</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Juzgado</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Tipo de Juicio</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Acuerdo</span>
                                </th>
                                <th style={{width: '350px'}}>
                                    <span>Comentario de Acuerdo Pendiente</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Desechamiento</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Motivo Desechamiento</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Amparo</span>
                                </th>
                                <th style={{width: '150px'}}>
                                    <span>Resolución de Amparo</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Fecha de Resolución de Amparo</span>
                                </th>
                                <th style={{width: '350px'}}>
                                    <span>Horarios Juzgados</span>
                                </th>
                                <th style={{width: '200px'}}>
                                    <span>Fecha de Admisión</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Resultado de Emplazamiento</span>
                                </th>
                                <th style={{width: '250px'}}>
                                    <span>Etapa Actual</span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                {this.renderTableBodyWrapper()}
            </div>
        );
    },
    renderTableBodyWrapper: function () {
        return (
            <div className='table-body-wrapper' style={{minWidth: tableMinWidth}}>
                {this.renderTableBody()}
            </div>
        );
    },
    renderTableBody: function () {
        return (
            <table className='table-body'>
                <tbody>
                    {this.renderReportes()}
                </tbody>
            </table>
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
                    <td style={{width: '250px'}}><span>{reporte.numeroContrato}</span></td>
                    <td style={{width: '350px'}}><span>{reporte.nombre}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaAsignacion}</span></td>
                    <td style={{width: '100px'}} className='centered'><span>{reporte.formattedValues.paqueteLegal}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaPaqueteLegal}</span></td>
                    <td style={{width: '150px'}} className='centered'><span>{reporte.formattedValues.certificacionContable}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaVisita}</span></td>
                    <td style={{width: '150px'}} className='centered'><span>{reporte.formattedValues.resultadoVisita}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.formattedValues.fechaPresentacionDemanda}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.expediente}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.juzgado}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.tipoJuicio}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaAcuerdo}</span></td>
                    <td style={{width: '350px'}}><span>{reporte.comentarioAcuerdoPendiente}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaDesechamiento}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.motivoDesechamiento}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaPresentacionAmparo}</span></td>
                    <td style={{width: '150px'}} className='centered'><span>{reporte.resolucionAmparo}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.formattedValues.fechaResolucionAmparo}</span></td>
                    <td style={{width: '350px'}}><span>{reporte.formattedValues.horariosJuzgado}</span></td>
                    <td style={{width: '200px'}}><span>{reporte.formattedValues.fechaAdmision}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.resultadoEmplazamiento}</span></td>
                    <td style={{width: '250px'}}><span>{reporte.etapaActual ? AccionRecord.ACCIONES_TYPES[reporte.etapaActual] : ''}</span></td>
                </tr>
            );
        });

        return reportes;
    }
});

module.exports = ReportesTabla;
