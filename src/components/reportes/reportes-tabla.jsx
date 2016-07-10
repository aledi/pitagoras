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
    render: function () {
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
                            <th>Fecha de Visita</th>
                            <th>Resultado de Visita</th>
                            <th>Fecha Presentación de Demanda</th>
                            <th>Expediente</th>
                            <th>Juzgado</th>
                            <th>Tipo de Juicio</th>
                            <th>Fecha de Acuerdo</th>
                            <th>Fecha Desechamiento</th>
                            <th>Motivo Desechamiento</th>
                            <th>Fecha de Radicación o Confirma Desechamiento</th>
                            <th>Horarios Juzgados</th>
                            <th>Etapa Actual</th>
                        </tr>
                        {this.renderContent()}
                    </tbody>
                </table>
            </div>
        );
    },
    renderContent: function () {
        if (!this.props.reportes) {
            return;
        }

        var reportes = [];

        this.props.reportes.forEach(function (reporte) {
            reportes.push(
                <tr key={reporte.id} className='content-row'>
                    <td>{reporte.nombre}</td>
                    <td>{reporte.numeroContrato}</td>
                    <td>{reporte.formattedValues.fechaAsignacion}</td>
                    <td>{reporte.formattedValues.paqueteLegal}</td>
                    <td>{reporte.formattedValues.fechaPaqueteLegal}</td>
                    <td>{reporte.formattedValues.fechaVisita}</td>
                    <td>{reporte.resultadoVisita}</td>
                    <td>{reporte.formattedValues.fechaPresentacionDemanda}</td>
                    <td>{reporte.expediente}</td>
                    <td>{reporte.juzgado}</td>
                    <td>{reporte.tipoJuicio}</td>
                    <td>{reporte.formattedValues.fechaAcuerdo}</td>
                    <td>{reporte.formattedValues.fechaDesechamiento}</td>
                    <td>{reporte.motivoDesechamiento}</td>
                    <td>{reporte.formattedValues.fechaRadicacion}</td>
                    <td>{reporte.formattedValues.horariosJuzgado}</td>
                    <td>{reporte.etapaActual ? AccionRecord.ACCIONES_TYPES[reporte.etapaActual] : ''}</td>
                </tr>
            );
        });

        return reportes;
    }
});

module.exports = ReportesTabla;
