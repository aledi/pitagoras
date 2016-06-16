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
    renderButton: function () {
        return (<button type='button' onClick={this.saveAccion}>Guardar</button>);
    },
    saveAccion: function () {
        AccionesActions.saveAccion(AccionRecord.prepareForParse(this.state));
    }
};

module.exports = AccionesMixin;
