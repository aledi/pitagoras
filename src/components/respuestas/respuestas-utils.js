'use strict';

function formatBooleanRespuesta (respuesta) {
    if (typeof respuesta !== 'boolean') {
        return;
    }

    if (respuesta) {
        return 'Sí';
    } else {
        return 'No';
    }
}

module.exports = {formatBooleanRespuesta: formatBooleanRespuesta};
