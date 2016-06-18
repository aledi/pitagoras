'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var VisitaRespuestas = require('src/components/respuestas/visita-respuestas'); // 1
var AltaDocumentosRespuestas = require('src/components/respuestas/alta-documentos-respuestas'); // 2
var AperturaJuicioRespuestas = require('src/components/respuestas/apertura-juicio-respuestas'); // 3
var PresentacionDemandaRespuestas = require('src/components/respuestas/presentacion-demanda-respuestas'); // 4
var AcuerdoDemandaRespuestas = require('src/components/respuestas/acuerdo-demanda-respuestas'); // 5
var DemandaDesechadaRespuestas = require('src/components/respuestas/demanda-desechada-respuestas'); // 6
var RecoleccionDocumentosRespuestas = require('src/components/respuestas/recoleccion-documentos-respuestas'); // 7
var DemandaPrevenidaRespuestas = require('src/components/respuestas/demanda-prevenida-respuestas'); // 8
var DemandaAdmitidaRespuestas = require('src/components/respuestas/demanda-admitida-respuestas'); // 9
var DiligenciaEmbargoRespuestas = require('src/components/respuestas/diligencia-embargo-respuestas'); // 10
var EmplazamientoRespuestas = require('src/components/respuestas/emplazamiento-respuestas'); // 11
var DesahogoRespuestas = require('src/components/respuestas/desahogo-respuestas'); // 12

// -----------------------------------------------------------------------------------------------
// AccionesHistorial
// -----------------------------------------------------------------------------------------------

var AccionesHistorial = React.createClass({
    render: function () {
        if (!this.props.acciones) {
            return (<div />);
        }

        return (
            <div className='acciones-historial-wrapper'>
                <ul>
                    {this.renderAcciones()}
                </ul>
            </div>
        );
    },
    renderAcciones: function () {
        var acciones = [];

        var self = this;
        this.props.acciones.forEach(function (accion, index) {
            acciones.push(
                <li key={accion.id}>
                    {self.getAccionForType(accion)}
                </li>
            );
        });

        return acciones;
    },
    getAccionForType: function (accion) {
        switch (accion.tipo) {
            case 1:
                return (<VisitaRespuestas accion={accion} />);
            case 2:
                return (<AltaDocumentosRespuestas accion={accion} />);
            case 3:
                return (<AperturaJuicioRespuestas accion={accion} />);
            case 4:
                return (<PresentacionDemandaRespuestas accion={accion} />);
            case 5:
                return (<AcuerdoDemandaRespuestas accion={accion} />);
            case 6:
                return (<DemandaDesechadaRespuestas accion={accion} />);
            case 7:
                return (<RecoleccionDocumentosRespuestas accion={accion} />);
            case 8:
                return (<DemandaPrevenidaRespuestas accion={accion} />);
            case 9:
                return (<DemandaAdmitidaRespuestas accion={accion} />);
            case 10:
                return (<DiligenciaEmbargoRespuestas accion={accion} />);
            case 11:
                return (<EmplazamientoRespuestas accion={accion} />);
            case 12:
                return (<DesahogoRespuestas accion={accion} />);
            default:
                break;
        }
    }
});

module.exports = AccionesHistorial;
