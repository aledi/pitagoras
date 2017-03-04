'use strict';

require('src/stores/reportes-store');

var Parse = require('parse');
var Immutable = require('immutable');
var Dispatcher = require('src/dispatcher');

var ReporteRecord = require('src/records/reporte');
var ReporteObject = Parse.Object.extend('Reporte');

module.exports = {
    fetchReportes: function () {
        Dispatcher.dispatch({
            type: 'REPORTES_FETCH'
        });

        var query = new Parse.Query(ReporteObject);
        query.limit(5000);
        query.find().then(function (reportes) {
            var reportesByKey = {};

            for (var i = 0; i < reportes.length; i++) {
                var reporte = createReporteRecord(reportes[i]);

                reportesByKey[reporte.id] = reporte;
            }

            Dispatcher.dispatch({
                type: 'REPORTES_FETCH_SUCCESS',
                reportes: new Immutable.Map(reportesByKey)
            });
        }).catch(function (error) {
            Dispatcher.dispatch({
                type: 'REPORTES_FETCH_ERROR',
                error: error
            });
        });
    }
};

function createReporteRecord (reporte) {
    return new ReporteRecord(reporte.toJSON());
}
