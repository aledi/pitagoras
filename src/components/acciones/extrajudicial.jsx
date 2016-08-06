'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

var AccionesMixin = require('./acciones-mixin');

// -----------------------------------------------------------------------------------------------
// Extrajudicial
// -----------------------------------------------------------------------------------------------

var Extrajudicial = React.createClass({
    mixins: [AccionesMixin],
    getInitialState: function () {
        return {
            tipo: 12,
            comentarios: '',
            creador: Parse.User.current(),
            contrato: this.props.contrato,
            respuestas: {},
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
            <div className='extrajudicial accion-form'>
                {this.renderComentarios()}
                {this.renderButton()}
            </div>
        );
    }
});

module.exports = Extrajudicial;
