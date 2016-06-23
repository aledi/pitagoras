'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesActions = require('src/actions/acciones-actions');
var AccionRecord = require('src/records/accion');
var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Desahogo
// -----------------------------------------------------------------------------------------------

var Desahogo = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 11,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {desahogar: true},
            disabled: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.getState(nextProps);
    },
    getState: function (props) {
        this.setState({disabled: props.disabled});
    },
    render: function () {
        return (
            <div className='desahogo accion-form'>
                {this.renderComentarios()}
                <button type='button' onClick={this.handleDesahogo} disabled={this.state.disabled}>Desahogar</button>
            </div>
        );
    },
    handleDesahogo: function () {
        AccionesActions.saveAccion(AccionRecord.prepareForParse(this.state));
    }
});

module.exports = Desahogo;
