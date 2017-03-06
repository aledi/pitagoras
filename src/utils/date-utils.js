'use strict';

var moment = require('moment');

function formatFechaRespuesta (date) {
    if (!date) {
        return;
    }

    var formattedDate = moment(date.iso);

    return formattedDate.format('D MMMM, YYYY');
}

module.exports = {formatFechaRespuesta: formatFechaRespuesta};
