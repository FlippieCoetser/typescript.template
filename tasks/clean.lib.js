#! /usr/bin/env node
let del = require('node-delete');
del(['./lib/*.js', './lib/*.d.ts'], () => true);
