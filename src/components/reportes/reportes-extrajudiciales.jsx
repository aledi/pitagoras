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
    selectReporte: function (reporte) {
        this.setState({reporte: reporte});
    }
});

module.exports = ReportesExtrajudiciales;
