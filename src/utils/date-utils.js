'use strict';

var moment = require('moment');

function formatFechaRespuesta (date) {
    if (!date) {
        return;
    }

    var formattedDate = moment(date.iso);

    return formattedDate.format('D MMMM, YYYY z');
}

module.exports = {formatFechaRespuesta: formatFechaRespuesta};
