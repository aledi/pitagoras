'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

var AccionesActions = require('../../actions/acciones-actions');
var AccionRecord = require('../../records/accion');

// -----------------------------------------------------------------------------------------------
// AccionesMixin
// -----------------------------------------------------------------------------------------------

var AccionesMixin = {
    renderComentarios: function () {
        return (
            <textarea
                placeholder='Comentarios'
                value={this.state.comentarios}
                onChange={this.handleComentariosChange}
                disabled={this.state.disabled} />
        );
    },
    renderButton: function () {
        return (<button type='button' onClick={this.saveAccion} disabled={this.state.disabled}>Guardar Acción</button>);
    },
    handleComentariosChange: function (event) {
        var state = {};
        state.comentarios = event.target.value;
        this.setState(state);
    },
    saveAccion: function () {
        var state = this.state;
        if ((((state.tipo === 16 || state.tipo === 18) && state.respuestas.favorable === 'Tercero') || (state.tipo === 17 && state.respuestas.promovido === 'Tercero')) && (!state.respuestas.tercero || !state.respuestas.tercero.trim())) {
            state.invalidFields.tercero = true;
            this.setState(state);

            return;
        }

        AccionesActions.saveAccion(AccionRecord.prepareForParse(this.state), this.state.contrato.id);
    }
};

module.exports = AccionesMixin;
