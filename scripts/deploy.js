#!/usr/bin/env node

'use strict';

/* eslint-disable no-console, no-process-env, no-process-exit, no-sync */

if (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false') {
    console.log('Build is a pull request, skipping deployment.');
    process.exit(0);
}

var config = require('config');
if (!config.has('cloudfrontId')) {
    console.error('No cloudfrontId found in config.');
    return process.exit(1);
}

var AWS = require('aws-sdk');
var cloudfront = new AWS.CloudFront();

cloudfront.createInvalidation({
    DistributionId: config.get('cloudfrontId'),
    InvalidationBatch: {
        CallerReference: (new Date()).toISOString(),
        Paths: {
            Quantity: 1,
            Items: ['/*']
        }
    }
}, function (error, data) {
    if (error) {
        console.error('CloudFront invalidation failed: ' + error.message);
        return process.exit(1);
    }

    console.log('CloundFront invalidation created.');
    console.log(data);

    process.exit(0);
});

/* eslint-enable no-console, no-process-env, no-process-exit, no-sync */
