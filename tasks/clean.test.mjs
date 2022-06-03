#! /usr/bin/env node
import del from './del.mjs'
del(['./src/*.js', './src/*.map'], () => true);
del(['./test/*.js', './test/*.map'], () => true);
