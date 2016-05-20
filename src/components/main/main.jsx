'use strict';

require('./main.scss');

// -----------------------------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------------------------

var Pitagoras = require('src/pitagoras');
var React = require('react');
var Parse = require('parse');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// -----------------------------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------------------------

var Main = React.createClass({
    contextTypes: {router: React.PropTypes.object.isRequired},
    getInitialState: function () {
        return this.getState(this.props);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState(this.getState(nextProps));
    },
    getState: function (props) {
        var route = (Array.isArray(props.routes) ? props.routes[props.routes.length - 1] : props.routes);
        var component = route.component;
        var state = {
            children: props.children,
            title: component.title || 'MISSING_TITLE',

            // Preserve previous links to keep last child route (e.g. /desarrollos/serena)
            links: this.state ? this.state.links : {
                index: '/index'
            }
        };

        // If route was changed, hide mobile nav & header menu
        if (this.props.location.pathname !== props.location.pathname) {
            state.showMobileNav = false;
            state.showMobileHeaderMenu = false;
        }

        // Update link of top level component (e.g. desarrollos = /desarrollos/serena)
        // NOTE: routes[0] is always main, routes[1] is always top level component (e.g. Desarrollos, Locales, etc)
        state.links[props.routes[1].path] = props.location.pathname;

        return state;
    },
    render: function () {
        return (
            <div id='pitagoras'>
                {this.renderChildren()}
            </div>
        );
    },
    renderChildren: function () {
        return this.state.children;
    }
});

module.exports = Main;
