'use strict';

require('./date-select.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

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
        return {time: this.getTimeObject(props.time ? props.time : '12:00 am')};
    },
    render: function () {
        return (
            <div className='date-select'>
                <div className='select-wrapper'>
                    <select value={this.state.time.hour} onChange={this.handleChange.bind(this, 'hour')}>
                        {this.renderHoras()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <select value={this.state.time.minutes} onChange={this.handleChange.bind(this, 'minutes')}>
                        {this.renderMinutos()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <select value={this.state.time.amPm} onChange={this.handleChange.bind(this, 'amPm')}>
                        <option value='am'>am</option>
                        <option value='pm'>pm</option>
                    </select>
                </div>
            </div>
        );
    },
    renderHoras: function () {
        return (['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(function (hour) {
            return (<option key={hour} value={hour}>{hour}</option>);
        }));
    },
    renderMinutos: function () {
        var minutos = [];

        for (var i = 0; i < 60; i++) {
            minutos.push((i < 10 ? '0' : '') + i);
        }

        return (minutos.map(function (minuto) {
            return (<option key={minuto} value={minuto}>{minuto}</option>);
        }));
    },
    handleChange: function (propertyName, event) {
        var time = this.state.time;
        time[propertyName] = event.target.value;

        this.props.onChange(time.hour + ':' + time.minutes + ' ' + time.amPm);

        this.setState({time: time});
    },
    getTimeObject: function (time) {
        var splittedTime = time.split(/[\s:]+/);

        return {
            hour: splittedTime[0],
            minutes: splittedTime[1],
            amPm: splittedTime[2]
        };
    }
});

module.exports = DateSelect;
