#!/usr/bin/env node

'use strict';

/* eslint-disable no-console, no-process-env, no-process-exit, no-sync */

var env = Object.create(process.env);
var childProcess = require('child_process');

// Skip over Pull Request
if (env.TRAVIS_PULL_REQUEST && env.TRAVIS_PULL_REQUEST !== 'false') {
    console.log('Build is a pull request, skipping build of artifacts.');
    process.exit(0);
}

// Calculate NODE_ENV based on branch
env.NODE_ENV = env.TRAVIS_BRANCH === 'master' ? 'production' : 'development';

console.log('----- Start of Build -----');
console.log('\nenvironment: ' + env.NODE_ENV + '\n');

// Spawn off webpack process
childProcess.spawn('webpack', ['-p'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: env,
    stdio: 'inherit'
}).on('exit', function (code) {
    if (code !== 0) {
        console.log('Unable to build webpack');
    }

    console.log('\n-----  End of Build  -----');
    process.exit(code);
});

/* eslint-enable no-console, no-process-env, no-process-exit, no-sync */
