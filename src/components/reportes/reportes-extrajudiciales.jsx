'use strict';

require('./reportes-extrajudiciales.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');
var moment = require('moment');

// -----------------------------------------------------------------------------------------------
// ReportesExtrajudiciales
// -----------------------------------------------------------------------------------------------

var ReportesExtrajudiciales = React.createClass({
    getInitialState: function () {
        return {reporte: null};
    },
    render: function () {
        return (
            <div className='reportes-extrajudiciales'>
                <div className='reportes'>
                    <ul className='reportes-list'>
                        {this.getReportes()}
                    </ul>
                </div>
                <h2>Reportes Extrajudiciales</h2>
                <div className='acciones'>
                    {this.renderAcciones()}
                </div>
                {this.createFakeTable()}
                <a id='dlink' style={{display: 'none'}} />
            </div>
        );
    },
    renderAcciones: function () {
        if (!this.state.reporte) {
            return;
        }

        return (
            <ul className='acciones-list'>
                {this.getAcciones()}
            </ul>
        );
    },
    getReportes: function () {
        if (!this.props.reportes) {
            return;
        }

        var reportes = [];
        var self = this;

        this.props.reportes.forEach(function (reporte) {
            if (!reporte.extrajudicial || !reporte.extrajudicial.length) {
                return;
            }

            reportes.push(
                <li key={reporte.id} className={classNames({selected: self.state.reporte && self.state.reporte.id === reporte.id})} onClick={self.selectReporte.bind(self, reporte)}>
                    <span>{reporte.numeroContrato}</span>
                    <span className='cliente'>{reporte.nombre}</span>
                </li>
            );
        });

        return reportes;
    },
    getAcciones: function () {
        var acciones = this.state.reporte.extrajudicial;
        var items = [];
        var self = this;

        acciones.forEach(function (accion, index) {
            items.unshift(
                <li key={index}>
                    <div>
                        <h5>{self.state.reporte.numeroContrato}</h5>
                    </div>
                    <div>
                        <span className='bold'>Comentarios: </span><span>{accion.comentarios}</span>
                    </div>
                    <div>
                        <span className='bold'>Realizada el: </span><span>{moment(accion.fecha).format('DD MMMM, YYYY')}</span>
                    </div>
                    <div>
                        <span className='bold'>Creador: </span><span>{accion.creador}</span>
                    </div>
                </li>
            );
        });

        return items;
    },
    createFakeTable: function () {
        return (
            <table id='extrajudiciales' style={{marginTop: 300}}>
                <thead>
                    <tr className='header'>
                        <th style={{width: '250px'}}>
                            <span>Número de Contrato</span>
                        </th>
                        <th style={{width: '350px'}}>
                            <span>Nombre</span>
                        </th>
                        <th style={{width: '200px'}}>
                            <span>Comentarios</span>
                        </th>
                        <th style={{width: '200px'}}>
                            <span>Fecha</span>
                        </th>
                        <th style={{width: '200px'}}>
                            <span>Creador</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        );
    },
    getRows: function () {
        var rows = [];
        var reportes = [];

        // Get reportes with acciones extrajudiciales
        this.props.reportes.forEach(function (reporte) {
            if (!reporte.extrajudicial || !reporte.extrajudicial.length) {
                return;
            }

            reportes.push(reporte);
        });

        // Iterate over each reporte to get all acciones extrajudiciales for that reporte
        for (var i = 0; i < reportes.length; i++) {
            var reporte = reportes[i];
            var acciones = reporte.extrajudicial;

            for (var j = 0; j < acciones.length; j++) {
                var accion = acciones[j];
                rows.push(
                    <tr key={reporte.id + '-' + j}>
                        <td style={{width: '250px'}} className='left'><span>{reporte.numeroContrato}</span></td>
                        <td style={{width: '350px'}} className='left'><span>{reporte.nombre}</span></td>
                        <td style={{width: '200px'}} className='left'><span>{accion.comentarios}</span></td>
                        <td style={{width: '200px'}} className='left'><span>{moment(accion.fecha).format('DD MMMM, YYYY')}</span></td>
                        <td style={{width: '200px'}} className='left'><span>{accion.creador}</span></td>
                    </tr>
                );
            }
        }

        return rows;
    },
    selectReporte: function (reporte) {
        this.setState({reporte: reporte});
    }
});

module.exports = ReportesExtrajudiciales;
