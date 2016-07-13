'use strict';

require('./acciones-historial.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

var VisitaRsp = require('src/components/respuestas/visita-rsp'); // 1
var AltaDocumentosRsp = require('src/components/respuestas/alta-documentos-rsp'); // 2
var PresentacionDemandaRsp = require('src/components/respuestas/presentacion-demanda-rsp'); // 3
var AcuerdoDemandaRsp = require('src/components/respuestas/acuerdo-demanda-rsp'); // 4
var Amparo = require('src/components/respuestas/amparo-rsp'); // 5
var DemandaDesechadaRsp = require('src/components/respuestas/demanda-desechada-rsp'); // 6
var RecoleccionDocumentosRsp = require('src/components/respuestas/recoleccion-documentos-rsp'); // 7
var DemandaPrevenidaRsp = require('src/components/respuestas/demanda-prevenida-rsp'); // 8
var DesahogoRsp = require('src/components/respuestas/desahogo-rsp'); // 9
var DemandaAdmitidaRsp = require('src/components/respuestas/demanda-admitida-rsp'); // 10
var DiligenciaEmbargoRsp = require('src/components/respuestas/diligencia-embargo-rsp'); // 11

// -----------------------------------------------------------------------------------------------
// AccionesHistorial
// -----------------------------------------------------------------------------------------------

var AccionesHistorial = React.createClass({
    render: function () {
        if (!this.props.acciones) {
            return (<div />);
        }

        if (this.props.acciones.size === 0) {
            return (<h3 className='no-acciones'>Sin acciones realizadas.</h3>);
        }

        return (
            <ul className='acciones-historial-list'>
                {this.renderAcciones()}
            </ul>
        );
    },
    renderAcciones: function () {
        var acciones = [];

        var self = this;
        this.props.acciones.forEach(function (accion, index) {
            acciones.push(
                <li key={accion.id} className='acciones-list-item'>
                    <div>
                        <h5>{AccionRecord.ACCIONES_TYPES[accion.tipo]}</h5>
                    </div>
                    {self.getRespuestasForAccion(accion)}
                    <div>
                        <span className='bold'>Comentarios: </span><span>{accion.comentarios}</span>
                    </div>
                    <div>
                        <span className='bold'>Creada por: </span><span>{accion.creador.nombre + ' ' + accion.creador.apellido}</span>
                    </div>
                    <div>
                        <span className='bold'>Realizada el: </span><span>{accion.fecha}</span>
                    </div>
                </li>
            );
        });

        return acciones;
    },
    getRespuestasForAccion: function (accion) {
        switch (accion.tipo) {
            case 1:
                return (<VisitaRsp accion={accion} />);
            case 2:
                return (<AltaDocumentosRsp accion={accion} />);
            case 3:
                return (<PresentacionDemandaRsp accion={accion} />);
            case 4:
                return (<AcuerdoDemandaRsp accion={accion} />);
            case 5:
                return (<Amparo accion={accion} />);
            case 6:
                return (<DemandaDesechadaRsp accion={accion} />);
            case 7:
                return (<RecoleccionDocumentosRsp accion={accion} />);
            case 8:
                return (<DemandaPrevenidaRsp accion={accion} />);
            case 9:
                return (<DesahogoRsp accion={accion} />);
            case 10:
                return (<DemandaAdmitidaRsp accion={accion} />);
            case 11:
                return (<DiligenciaEmbargoRsp accion={accion} />);
            default:
                break;
        }
    }
});

module.exports = AccionesHistorial;
