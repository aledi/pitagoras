'use strict';

require('./date-select.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var moment = require('moment');

// -----------------------------------------------------------------------------------------------
// DateSelect
// -----------------------------------------------------------------------------------------------

var DateSelect = React.createClass({
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        return {date: props.date ? moment(props.date).clone() : moment()};
    },
    render: function () {
        return (
            <div className='date-select'>
                <div className='select-wrapper'>
                    <label>Día</label>
                    <select value={this.state.date.get('date')} onChange={this.handleChange.bind(this, 'date')}>
                        {this.renderDias()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <label>Mes</label>
                    <select value={this.state.date.get('month')} onChange={this.handleChange.bind(this, 'month')}>
                        {this.renderMeses()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <label>Año</label>
                    <select value={this.state.date.get('year')} onChange={this.handleChange.bind(this, 'year')}>
                        {this.renderAnios()}
                    </select>
                </div>
            </div>
        );
    },
    renderDias: function (event) {
        var dias = [];
        var limite = this.getDaysForMonth(this.state.date.get('month'), this.state.date.get('year'));

        for (var index = 1; index <= limite; index++) {
            dias.push(<option key={index} value={index}>{index}</option>);
        }

        return dias;
    },
    renderMeses: function (event) {
        var meses = [];

        for (var index = 0; index < 12; index++) {
            meses.push(<option key={index} value={index}>{this.getMonthByNumber(index)}</option>);
        }

        return meses;
    },
    renderAnios: function (event) {
        var anios = [];
        var actual = new Date().getFullYear();

        for (var index = actual; index >= actual - 25; index--) {
            anios.push(<option key={index} value={index}>{index}</option>);
        }

        return anios;
    },
    getMonthByNumber: function (mes) {
        switch (mes) {
            case 0:
                return 'Enero';
            case 1:
                return 'Febrero';
            case 2:
                return 'Marzo';
            case 3:
                return 'Abril';
            case 4:
                return 'Mayo';
            case 5:
                return 'Junio';
            case 6:
                return 'Julio';
            case 7:
                return 'Agosto';
            case 8:
                return 'Septiembre';
            case 9:
                return 'Octubre';
            case 10:
                return 'Noviembre';
            case 11:
                return 'Diciembre';
            default:
                break;
        }
    },
    getDaysForMonth: function (mes, anio) {
        if (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
            return 31;
        } else if (mes === 2) {
            return (((anio % 4 === 0) && (anio % 100 !== 0)) || (anio % 400 === 0)) ? 29 : 28;
        }

        return 30;
    },
    handleChange: function (propertyName, event) {
        var state = {};
        state.date = this.state.date.clone();
        state.date.set(propertyName, event.target.value);

        this.props.onChange(state.date);

        this.setState(state);
    }
});

module.exports = DateSelect;
