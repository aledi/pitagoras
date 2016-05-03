'use strict';

/*
 * Processes columns by generating corresponding comparators.
 */
function processColumns (columns) {
    columns.comparators = generateComparatorsForColumns(columns);

    return columns;
}

/*
 * Basic comparator function for comparing two keys of two values.
 */
function comparator (key, a, b, ascending) {
    a = a.sortValues[key];
    b = b.sortValues[key];

    // If one value is string, make sure both are before comparing.
    if (typeof a === 'string' || typeof b === 'string') {
        a = '' + a;
        b = '' + b;
    }

    if (a === b) {
        return 0;
    } else if (a < b) {
        return ascending ? -1 : 1;
    } else {
        return ascending ? 1 : -1;
    }
}

/*
 * Given a list of column infos, generates comparators by column.id
 */
function generateComparatorsForColumns (columns) {
    var comparators = {};

    columns.forEach(function (column) {
        column.sortKeys = column.sortKeys || [column.id];
        comparators[column.id] = generateComparator(column.sortKeys.slice(0));
    });

    return comparators;
}

/*
 * Generates comparator based on an array of sort keys.
 */
function generateComparator (sortKeys) {
    if (sortKeys.length === 1) {
        return comparator.bind(comparator, sortKeys[0]);
    }

    var sortKey = sortKeys.shift();
    var nestedComparator = generateComparator(sortKeys);

    return (function (a, b, ascending) {
        var comparison = comparator(sortKey, a, b, ascending);
        if (comparison === 0) {
            return nestedComparator(a, b, ascending);
        }

        return comparison;
    });
}

module.exports = {
    processColumns: processColumns
};
