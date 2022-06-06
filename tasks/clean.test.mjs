#! /usr/bin/env node
import del from './del.mjs'
del(['./src/*.js', './src/*.map']);
del(['./test/*.js', './test/*.map']);
