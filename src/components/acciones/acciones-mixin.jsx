'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesActions = require('src/actions/acciones-actions');
var AccionRecord = require('src/records/accion');

// -----------------------------------------------------------------------------------------------
// AccionesMixin
// -----------------------------------------------------------------------------------------------

var AccionesMixin = {
    renderComentarios: function () {
        return (<textarea value={this.state.comentarios} onChange={this.handleComentariosChange} />);
    },
    renderButton: function () {
        return (<button type='button' onClick={this.saveAccion}>Guardar</button>);
    },
    handleComentariosChange: function (event) {
        var state = {};
        state.comentarios = event.target.value;
        this.setState(state);
    },
    saveAccion: function () {
        AccionesActions.saveAccion(AccionRecord.prepareForParse(this.state));
    }
};

module.exports = AccionesMixin;
