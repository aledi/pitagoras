'use strict';

require('./acciones-historial.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

var Visita = require('src/components/respuestas/visita'); // 1
var AltaDocumentos = require('src/components/respuestas/alta-documentos'); // 2
var PresentacionDemanda = require('src/components/respuestas/presentacion-demanda'); // 3
var AcuerdoDemanda = require('src/components/respuestas/acuerdo-demanda'); // 4
var Amparo = require('src/components/respuestas/amparo'); // 5
var DemandaDesechada = require('src/components/respuestas/demanda-desechada'); // 6
var RecoleccionDocumentos = require('src/components/respuestas/recoleccion-documentos'); // 7
var DemandaPrevenida = require('src/components/respuestas/demanda-prevenida'); // 8
var Desahogo = require('src/components/respuestas/desahogo'); // 9
var DemandaAdmitida = require('src/components/respuestas/demanda-admitida'); // 10
var DiligenciaEmbargo = require('src/components/respuestas/diligencia-embargo'); // 11
var FechaAudienciaPrevia = require('src/components/respuestas/fecha-audiencia-previa'); // 13
var FechaAudienciaPrueba = require('src/components/respuestas/fecha-audiencia-prueba'); // 14
var FechaSentencia = require('src/components/respuestas/fecha-sentencia'); // 15
var Sentencia = require('src/components/respuestas/sentencia'); // 16
var AmparoSentencia = require('src/components/respuestas/amparo-sentencia'); // 17
var ResolucionAmparoSentencia = require('src/components/respuestas/resolucion-amparo-sentencia'); // 18
var Apelacion = require('src/components/respuestas/apelacion'); // 19
var SentenciaApelacion = require('src/components/respuestas/sentencia-apelacion'); // 20
var FechaAudienciaPruebas = require('src/components/respuestas/fecha-audiencia-pruebas'); // 21
var Liquidacion = require('src/components/respuestas/liquidacion'); // 22
var Convenio = require('src/components/respuestas/convenio'); // 22

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
                return (<Visita accion={accion} />);
            case 2:
                return (<AltaDocumentos accion={accion} />);
            case 3:
                return (<PresentacionDemanda accion={accion} />);
            case 4:
                return (<AcuerdoDemanda accion={accion} />);
            case 5:
                return (<Amparo accion={accion} />);
            case 6:
                return (<DemandaDesechada accion={accion} />);
            case 7:
                return (<RecoleccionDocumentos accion={accion} />);
            case 8:
                return (<DemandaPrevenida accion={accion} />);
            case 9:
                return (<Desahogo accion={accion} />);
            case 10:
                return (<DemandaAdmitida accion={accion} />);
            case 11:
                return (<DiligenciaEmbargo accion={accion} />);
            case 13:
                return (<FechaAudienciaPrevia accion={accion} />);
            case 14:
                return (<FechaAudienciaPrueba accion={accion} />);
            case 15:
                return (<FechaSentencia accion={accion} />);
            case 16:
                return (<Sentencia accion={accion} />);
            case 17:
                return (<AmparoSentencia accion={accion} />);
            case 18:
                return (<ResolucionAmparoSentencia accion={accion} />);
            case 19:
                return (<Apelacion accion={accion} />);
            case 20:
                return (<SentenciaApelacion accion={accion} />);
            case 21:
                return (<FechaAudienciaPruebas accion={accion} />);
            case 22:
                return (<Liquidacion accion={accion} />);
            case 23:
                return (<Convenio accion={accion} />);
            default:
                break;
        }
    }
});

module.exports = AccionesHistorial;
