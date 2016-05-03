'use strict';

function sortElements (elements, comparators, sortColumn, ascending) {
    if (!sortColumn) {
        return elements;
    }

    return elements.sort(function (a, b) {
        return comparators[sortColumn](a, b, ascending);
    });
}

function changeSortColumn (state, sortColumn, comparators, key) {
    var sortAscending = state.get('sortAscending');
    var newState = {};

    if (state.get('sortColumn') === sortColumn) {
        sortAscending = !sortAscending;
        newState.sortAscending = sortAscending;
    } else {
        newState.sortColumn = sortColumn;
    }

    newState[key] = sortElements(state.get(key), comparators, sortColumn, sortAscending);

    return state.merge(newState);
}

module.exports = {
    sortElements: sortElements,
    changeSortColumn: changeSortColumn
};
