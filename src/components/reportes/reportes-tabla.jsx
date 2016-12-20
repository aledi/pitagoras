'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

// -----------------------------------------------------------------------------------------------
// ReportesTabla
// -----------------------------------------------------------------------------------------------

var tableMinWidth = '6650px';

var ReportesTabla = React.createClass({
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
                    <th style={{width: '200px'}}>
                        <span>Fecha de Asignación</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Tipo de Asignación</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Tipo de Contrato</span>
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
                        <span>Fecha de Audiencia Previa</span>
                    </th>
                    <th style={{width: '250px'}}>
                        <span>Fecha de Audiencia Prueba</span>
                    </th>
                    <th style={{width: '200px'}}>
                        <span>Fecha de Sentencia</span>
                    </th>
                    <th style={{width: '350px'}}>
                        <span>Fecha de Resolución Amparo vs Sentencia</span>
                    </th>
                    <th style={{width: '250px'}}>
                        <span>Resultado de Emplazamiento</span>
                    </th>
                    <th style={{width: '250px'}}>
                        <span>Etapa Actual</span>
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
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaAsignacion}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.tipoAsignacion}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.tipoContrato}</span></td>
                    <td style={{width: '100px', textAlign: 'center'}}><span>{reporte.formattedValues.paqueteLegal}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaPaqueteLegal}</span></td>
                    <td style={{width: '150px', textAlign: 'center'}}><span>{reporte.formattedValues.certificacionContable}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaVisita}</span></td>
                    <td style={{width: '150px', textAlign: 'center'}}><span>{reporte.formattedValues.resultadoVisita}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaPresentacionDemanda}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.expediente}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.juzgado}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.tipoJuicio}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaAcuerdo}</span></td>
                    <td style={{width: '350px', textAlign: 'left'}}><span>{reporte.comentarioAcuerdoPendiente}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaDesechamiento}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.motivoDesechamiento}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaPresentacionAmparo}</span></td>
                    <td style={{width: '150px', textAlign: 'center'}}><span>{reporte.resolucionAmparo}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaResolucionAmparo}</span></td>
                    <td style={{width: '350px', textAlign: 'left'}}><span>{reporte.formattedValues.horariosJuzgado}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaAdmision}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaAudienciaPrevia}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaAudienciaPrueba}</span></td>
                    <td style={{width: '200px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaSentencia}</span></td>
                    <td style={{width: '350px', textAlign: 'left'}}><span>{reporte.formattedValues.fechaResolucionAmparoSentencia}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.resultadoEmplazamiento}</span></td>
                    <td style={{width: '250px', textAlign: 'left'}}><span>{reporte.etapaActual ? AccionRecord.ACCIONES_TYPES[reporte.etapaActual] : ''}</span></td>
                </tr>
            );
        });

        return reportes;
    },
    handleKeyUp: function (event) {
        event.persist();

        // Left arrow
        if (event.keyCode === 37) {
            document.getElementById('table-wrapper-reportes').focus();
        }

        // Up arrow
        if (event.keyCode === 38) {
            document.getElementById('table-body-wrapper-reportes').focus();
        }

        // Right arrow
        if (event.keyCode === 39) {
            document.getElementById('table-wrapper-reportes').focus();
        }

        // Down arrow
        if (event.keyCode === 40) {
            document.getElementById('table-body-wrapper-reportes').focus();
        }
    }
});

module.exports = ReportesTabla;
