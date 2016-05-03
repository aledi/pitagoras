'use strict';

function calculateChangedAttributes (previousAttributes, newAttributes, comparator) {
    var changedAttributes = {id: previousAttributes.id};
    var hasChangedAttributes = false;

    comparator = comparator || defaultComparator;

    for (var attributeName in newAttributes) {
        if (!newAttributes.hasOwnProperty(attributeName)) {
            continue;
        }

        var newAttribute = newAttributes[attributeName];
        if (comparator(attributeName, previousAttributes[attributeName], newAttribute)) {
            changedAttributes[attributeName] = newAttribute;
            hasChangedAttributes = true;
        }
    }

    if (hasChangedAttributes) {
        return changedAttributes;
    }
}

function defaultComparator (attributeName, previousValue, newValue) {
    return (previousValue !== newValue);
}

module.exports = {
    calculateChangedAttributes: calculateChangedAttributes
};
