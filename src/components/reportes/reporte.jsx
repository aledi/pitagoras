'use strict';

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var moment = require('moment');

// -----------------------------------------------------------------------------------------------
// Reporte
// -----------------------------------------------------------------------------------------------

var Reporte = React.createClass({
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        return {reporte: props.reporte};
    },
    render: function () {
        if (!this.state.reporte) {
            return (<div />);
        }

        return (
            <div>
                {this.renderAcciones()}
            </div>
        );
    },
    renderAcciones: function () {
        var reporte = this.state.reporte;

        if (!reporte.extrajudicial || !reporte.extrajudicial.length) {
            return;
        }

        return (reporte.extrajudicial.map(function (accion, index) {
            return (
                <div key={index}>
                    <div>
                        <span className='bold'>Comentarios: </span><span>{accion.comentarios}</span>
                    </div>
                    <div>
                        <span className='bold'>Creada por: </span><span>{accion.creador}</span>
                    </div>
                    <div>
                        <span className='bold'>Realizada el: </span><span>{moment(accion.fecha).format('DD MMM, YYYY')}</span>
                    </div>
                </div>
            );
        }));
    }
});

module.exports = Reporte;
