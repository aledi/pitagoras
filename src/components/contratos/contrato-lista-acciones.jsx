'use strict';

require('./contrato-lista-acciones.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// ContratoListaAcciones
// -----------------------------------------------------------------------------------------------

var ContratoListaAcciones = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    render: function () {
        var contrato = this.props.contrato;

        return (
            <div className='contrato-lista-acciones'>
                <p className='go-back' onClick={this.goBack}>Volver a Contratos</p>
                <div className='contrato-detalles'>
                    <p>Detalles del Contrato</p>
                    <div>
                        <span className='title'>Número de Contrato:</span>
                        <span className='value'>{contrato.numeroContrato}</span>
                    </div>
                    <div>
                        <span className='title'>Cliente:</span>
                        <span className='value'>{contrato.formattedValues.cliente}</span>
                    </div>
                    <div>
                        <span className='title'>Modelo:</span>
                        <span className='value'>{contrato.vehiculo.modelo}</span>
                    </div>
                    <div>
                        <span className='title'>Marca:</span>
                        <span className='value'>{contrato.vehiculo.marca}</span>
                    </div>
                    <div>
                        <span className='title'>Año:</span>
                        <span className='value'>{contrato.vehiculo.anio}</span>
                    </div>
                    <div>
                        <span className='title'>Distribuidor:</span>
                        <span className='value'>{contrato.vehiculo.distribuidor}</span>
                    </div>
                    <div>
                        <span className='title'>Monto:</span>
                        <span className='value'>{contrato.monto}</span>
                    </div>
                    <div>
                        <span className='title'>Plazo:</span>
                        <span className='value'>{contrato.plazo}</span>
                    </div>
                    <div>
                        <span className='title'>Tasa:</span>
                        <span className='value'>{contrato.tasa}</span>
                    </div>
                </div>

                <p>Acciones Disponibles</p>
                <ul>
                    <li>Visita</li>
                    <li>Alta de documentos</li>
                    <li>Apertura de juicio</li>
                    <li>Presentación de demanda</li>
                    <li>Acuerdo de demanda</li>
                    <li>Demanda desechada</li>
                    <li>Recolección de documentos</li>
                    <li>Demanda prevenida</li>
                    <li>Demanda admitida</li>
                    <li>Diligencia de embargo</li>
                    <li>Emplazamiento</li>
                    <li>Desahogo / Cierre</li>
                </ul>
            </div>
        );
    },
    goBack: function () {
        this.context.router.replace('/contratos');
    }
});

module.exports = ContratoListaAcciones;
