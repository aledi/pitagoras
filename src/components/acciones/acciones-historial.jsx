'use strict';

require('./acciones-historial.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionRecord = require('src/records/accion');

var Visita = require('../respuestas/visita'); // 1
var AltaDocumentos = require('../respuestas/alta-documentos'); // 2
var PresentacionDemanda = require('../respuestas/presentacion-demanda'); // 3
var AcuerdoDemanda = require('../respuestas/acuerdo-demanda'); // 4
var Amparo = require('../respuestas/amparo'); // 5
var DemandaDesechada = require('../respuestas/demanda-desechada'); // 6
var RecoleccionDocumentos = require('../respuestas/recoleccion-documentos'); // 7
var DemandaPrevenida = require('../respuestas/demanda-prevenida'); // 8
var Desahogo = require('../respuestas/desahogo'); // 9
var Emplazamiento = require('../respuestas/emplazamiento'); // 10
var DiligenciaEmbargo = require('../respuestas/diligencia-embargo'); // 11
var Extrajudicial = require('../respuestas/extrajudicial'); // 12
var FechaAudienciaPrevia = require('../respuestas/fecha-audiencia-previa'); // 13
var FechaAudienciaPrueba = require('../respuestas/fecha-audiencia-prueba'); // 14
var FechaSentencia = require('../respuestas/fecha-sentencia'); // 15
var Sentencia = require('../respuestas/sentencia'); // 16
var AmparoSentencia = require('../respuestas/amparo-sentencia'); // 17
var ResolucionAmparoSentencia = require('../respuestas/resolucion-amparo-sentencia'); // 18
var Apelacion = require('../respuestas/apelacion'); // 19
var SentenciaApelacion = require('../respuestas/sentencia-apelacion'); // 20
var FechaAudienciaPruebas = require('../respuestas/fecha-audiencia-pruebas'); // 21
var Liquidacion = require('../respuestas/liquidacion'); // 22
var Convenio = require('../respuestas/convenio'); // 23
var Repo = require('../respuestas/repo'); // 24

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
                        <span className='bold'>Creada por: </span><span>{accion.creador ? (accion.creador.nombre + ' ' + accion.creador.apellido) : ''}</span>
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
                return (<Emplazamiento accion={accion} />);
            case 11:
                return (<DiligenciaEmbargo accion={accion} />);
            case 12:
                return (<Extrajudicial accion={accion} />);
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
            case 24:
                return (<Repo accion={accion} />);
            default:
                break;
        }
    }
});

module.exports = AccionesHistorial;
