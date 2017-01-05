'use strict';

require('./search.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var classNames = require('classnames');
var fuzzy = require('fuzzy');

var ContratosStore = require('src/stores/contratos-store');

// -----------------------------------------------------------------------------------------------
// Search
// -----------------------------------------------------------------------------------------------

var Search = React.createClass({
    contextTypes: {
        hideModal: React.PropTypes.func,
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return this.getState();
    },
    componentDidMount: function () {
        this.contratosStore = ContratosStore.addListener(this.onChange);
    },
    componentWillUnmount: function () {
        this.contratosStore.remove();
    },
    onChange: function () {
        this.setState(this.getState());
    },
    getState: function () {
        var contratos = ContratosStore.getContratosForSearch();

        var contratosFuzzyValues = contratos.map(function (contrato) {
            return contrato.value;
        });

        return {
            searchValue: '',
            contratos: contratos,
            contratosFuzzyValues: contratosFuzzyValues
        };
    },
    render: function () {
        return (
            <div className='backdrop' id='backdrop'>
                <div className='modal-wrapper'>
                    <div className='modal'>
                        <button type='button'>Cerrar</button>
                        <input type='text' value={this.state.searchValue} onChange={this.handleChange} />
                        {this.renderResultsContent()}
                    </div>
                </div>
            </div>
        );
    },
    renderResultsContent: function () {
        var state = this.state;
        if (state.contratosResults && !state.contratosResults.length) {
            return (<span>No se encontraron resultados.</span>);
        }

        return (
            <div className='categories'>
                {this.renderResults()}
            </div>
        );
    },
    renderResults: function () {
        if (!this.state.contratosResults || !this.state.contratosResults.length) {
            return;
        }

        return (
            <div className='category-search-result'>
                {this.getResultsItems()}
            </div>
        );
    },
    getResultsItems: function () {
        var self = this;
        console.log(this.state.contratosResults)

        return this.state.contratosResults.map(function (result) {
            var option = self.state.contratos[result.index];
            return (
                <div className='result-wrapper' key={option.id}>
                    <div className='result-details' onClick={self.redirectToResult.bind(self, 'contratos', option.id)}>
                        <span className='result-title'>{option.title}</span>
                    </div>
                </div>
            );
        });
    },
    handleChange: function (event) {
        var value = event.target.value;

        this.setState({
            searchValue: value,
            contratosResults: value ? fuzzy.filter(value, this.state.contratosFuzzyValues) : null
        });
    },
    redirectToResult: function (route, id) {
        this.context.router.push('/' + route + '/' + id);
    }
});

module.exports = Search;
