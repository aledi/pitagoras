'use strict';

require('./contrato.scss');

var React = require('react');

var Contrato = React.createClass({
    render: function () {
        return (
            <div>
                <p>{this.props.contrato.id}</p>
                <p>{this.props.contrato.numeroContrato}</p>
                <p>{this.props.contrato.cliente.nombre}</p>
            </div>
        );
    }
});

module.exports = Contrato;
