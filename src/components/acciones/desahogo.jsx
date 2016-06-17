'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesActions = require('src/actions/acciones-actions');
var AccionRecord = require('src/records/accion');

// -----------------------------------------------------------------------------------------------
// Desahogo
// -----------------------------------------------------------------------------------------------

var Desahogo = React.createClass({
    getInitialState: function () {
        return {
            tipo: 12,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {desahogar: true}
        };
    },
    render: function () {
        return (
            <div className='desahogo'>
                <button type='button' onClick={this.handleDesahogo}>Desahogar</button>
                {this.renderComentarios()}
            </div>
        );
    },
    handleDesahogo: function () {
        AccionesActions.saveAccion(AccionRecord.prepareForParse(this.state));
    }
});

module.exports = Desahogo;
