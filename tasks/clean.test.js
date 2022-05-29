#! /usr/bin/env node
let del = require('node-delete');
del(['./src/**/*.js', './src/**/*.map'], () => true);
del(['./test/*.js', './test/*.map'], () => true);
