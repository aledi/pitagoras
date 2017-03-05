'use strict';

require('./date-select.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');

// -----------------------------------------------------------------------------------------------
// TimeSelect
// -----------------------------------------------------------------------------------------------

var TimeSelect = React.createClass({
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var time = props.time ? this.getTimeObject(props.time) : null;
        return {
            time: time,
            hour: time ? time.hour : null,
            minutes: time ? time.minutes : null,
            amPm: time ? time.amPm : null
        };
    },
    render: function () {
        return (
            <div className='time-select'>
                <div className='select-wrapper'>
                    <select value={this.state.hour == null ? '-' : this.state.hour} onChange={this.handleChange.bind(this, 'hour')}>
                        {this.renderHours()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <select value={this.state.minutes == null ? '-' : this.state.minutes} onChange={this.handleChange.bind(this, 'minutes')}>
                        {this.renderMinutes()}
                    </select>
                </div>
                <div className='select-wrapper'>
                    <select value={this.state.amPm == null ? '-' : this.state.amPm} onChange={this.handleChange.bind(this, 'amPm')}>
                        <option value='-'>-</option>
                        <option value='am'>am</option>
                        <option value='pm'>pm</option>
                    </select>
                </div>
            </div>
        );
    },
    renderHours: function () {
        return (['-', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(function (hour) {
            return (<option key={hour} value={hour}>{hour}</option>);
        }));
    },
    renderMinutes: function () {
        var minutos = ['-'];

        for (var i = 0; i < 60; i++) {
            minutos.push((i < 10 ? '0' : '') + i);
        }

        return (minutos.map(function (minuto) {
            return (<option key={minuto} value={minuto}>{minuto}</option>);
        }));
    },
    handleChange: function (key, event) {
        if (event.target.value === '-') {
            this.setState({time: null, hour: null, minutes: null, amPm: null});
            this.props.onChange(null);
            return;
        }

        var state = this.state;
        state[key] = event.target.value;
        this.setState(state);

        if (state.hour && state.minutes && state.amPm) {
            state.time = state.hour + ':' + state.minutes + ' ' + state.amPm;
        } else {
            return;
        }

        this.props.onChange(state.time);
        this.setState({time: state.time});
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

module.exports = TimeSelect;
