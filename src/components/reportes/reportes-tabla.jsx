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

var ReportesTabla = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return {showingReportesGenerales: true};
    },
    render: function () {
        return (
            <div>
                <span className='side-button right' onClick={this.toggleDetails}>{'Mostrar' + (this.state.showingReportesGenerales ? ' Extrajudiciales' : ' Generales')}</span>
                {this.renderReportesGenerales()}
            </div>
        );
    },
    renderReportesGenerales: function () {
        return (
            <div className='reportes-table-wrapper'>
                <table>
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <th>Contrato</th>
                            <th>Fecha de Asignación</th>
                            <th>Paquete Legal</th>
                            <th>Fecha Paquete Legal Recibido</th>
                            <th>Certificación Contable</th>
                            <th>Fecha de Visita</th>
                            <th>Resultado de Visita</th>
                            <th>Fecha Presentación de Demanda</th>
                            <th>Expediente</th>
                            <th>Juzgado</th>
                            <th>Tipo de Juicio</th>
                            <th>Fecha de Acuerdo</th>
                            <th>Comentario de Acuerdo Pendiente</th>
                            <th>Fecha Desechamiento</th>
                            <th>Motivo Desechamiento</th>
                            <th>Fecha de Amparo</th>
                            <th>Resolución de Amparo</th>
                            <th>Fecha de Resolución de Amparo</th>
                            <th>Fecha de Radicación o Confirma Desechamiento</th>
                            <th>Horarios Juzgados</th>
                            <th>Fecha de Admisión</th>
                            <th>Resultado de Emplazamiento</th>
                            <th>Etapa Actual</th>
                        </tr>
                        {this.renderReportes()}
                    </tbody>
                </table>
            </div>
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
                    <td>{reporte.nombre}</td>
                    <td>{reporte.numeroContrato}</td>
                    <td>{reporte.formattedValues.fechaAsignacion}</td>
                    <td className='centered'>{reporte.formattedValues.paqueteLegal}</td>
                    <td>{reporte.formattedValues.fechaPaqueteLegal}</td>
                    <td className='centered'>{reporte.formattedValues.certificacionContable}</td>
                    <td>{reporte.formattedValues.fechaVisita}</td>
                    <td className='centered'>{reporte.formattedValues.resultadoVisita}</td>
                    <td>{reporte.formattedValues.fechaPresentacionDemanda}</td>
                    <td>{reporte.expediente}</td>
                    <td>{reporte.juzgado}</td>
                    <td>{reporte.tipoJuicio}</td>
                    <td>{reporte.formattedValues.fechaAcuerdo}</td>
                    <td>{reporte.comentarioAcuerdoPendiente}</td>
                    <td>{reporte.formattedValues.fechaDesechamiento}</td>
                    <td>{reporte.motivoDesechamiento}</td>
                    <td>{reporte.formattedValues.fechaPresentacionAmparo}</td>
                    <td>{reporte.resolucionAmparo}</td>
                    <td>{reporte.formattedValues.fechaResolucionAmparo}</td>
                    <td>{reporte.formattedValues.fechaRadicacion}</td>
                    <td>{reporte.formattedValues.horariosJuzgado}</td>
                    <td>{reporte.formattedValues.fechaAdmision}</td>
                    <td>{reporte.resultadoEmplazamiento}</td>
                    <td>{reporte.etapaActual ? AccionRecord.ACCIONES_TYPES[reporte.etapaActual] : ''}</td>
                </tr>
            );
        });

        return reportes;
    }
});

module.exports = ReportesTabla;
