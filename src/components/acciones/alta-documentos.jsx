'use strict';

require('./alta-documentos.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// AltaDocumentos
// -----------------------------------------------------------------------------------------------

var AltaDocumentos = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 2,
            comentarios: '',
            contrato: this.props.contrato,
            respuestas: {}
        };
    },
    render: function () {
        return (
            <div className='alta-documentos'>
                <label>Número Interno</label>
                <input type='text' />
                <label>Fecha de Recepción</label>
                <input type='text' />
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = AltaDocumentos;
