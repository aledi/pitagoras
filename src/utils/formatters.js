'use strict';

var formatNumber = require('format-number');

module.exports = {
    formatCurrency: formatNumber({prefix: '$', truncate: 2, padRight: 2}),
    formatM2: formatNumber({suffix: ' m²', truncate: 2}),
    formatNumber: formatNumber({truncate: 2}),
    formatWholeNumber: formatNumber({truncate: 0}),
    formatPercentage: formatNumber({suffix: '%', round: 0})
};
