'use strict';

require('./date-select.scss');

var React = require('react');
var moment = require('moment');

var DateSelect = React.createClass({
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var date = props.date ? moment(props.date.iso ? props.date.iso : props.date).clone() : null;
        return {
            date: date,
            day: date ? date.get('date') : null,
            month: date ? date.get('month') : null,
            year: date ? date.get('year') : null,
            disabled: props.disabled
        };
    },
    render: function () {
        return (
            <div className='date-select'>
                <div className='select-wrapper'>
                    <label>Día</label>
                    <select
                        value={this.state.day == null ? '-' : this.state.day}
                        disabled={this.state.disabled}
                        onChange={this.handleChange.bind(this, 'day')}>
                        {this.renderDias()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <label>Mes</label>
                    <select
                        value={this.state.month == null ? '-' : this.state.month}
                        disabled={this.state.disabled}
                        onChange={this.handleChange.bind(this, 'month')}>
                        {this.renderMeses()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <label>Año</label>
                    <select
                        value={this.state.year == null ? '-' : this.state.year}
                        disabled={this.state.disabled}
                        onChange={this.handleChange.bind(this, 'year')}>
                        {this.renderAnios()}
                    </select>
                </div>
            </div>
        );
    },
    renderDias: function (event) {
        var dias = [<option key={'day-'}>-</option>];
        var limite = this.state.date ? this.getDaysForMonth(this.state.date.get('month'), this.state.date.get('year')) : 31;

        for (var index = 1; index <= limite; index++) {
            dias.push(<option key={index} value={index}>{index}</option>);
        }

        return dias;
    },
    renderMeses: function (event) {
        var meses = [<option key={'month-'}>-</option>];

        for (var index = 0; index < 12; index++) {
            meses.push(<option key={index} value={index}>{this.getMonthByNumber(index)}</option>);
        }

        return meses;
    },
    renderAnios: function (event) {
        var anios = [<option key={'year-'}>-</option>];

        for (var index = 2020; index >= 1995; index--) {
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
        if (mes === 0 || mes === 2 || mes === 4 || mes === 6 || mes === 7 || mes === 9 || mes === 11) {
            return 31;
        } else if (mes === 1) {
            return (((anio % 4 === 0) && (anio % 100 !== 0)) || (anio % 400 === 0)) ? 29 : 28;
        }

        return 30;
    },
    handleChange: function (key, event) {
        if (event.target.value === '-') {
            this.setState({date: null, day: null, month: null, year: null});
            this.props.onChange(null);
            return;
        }

        var value = parseInt(event.target.value, 10);
        var state = this.state;
        state[key] = value;
        this.setState(state);

        if (state.day && state.month != null && state.year) {
            state.date = moment({years: state.year, months: state.month, date: state.day});
        } else {
            return;
        }

        if (key === 'day') {
            key = 'date';
        }

        state.date = state.date.clone();
        state.date.set(key, value);

        this.props.onChange(state.date);

        this.setState(state);
    }
});

module.exports = DateSelect;
