import process from 'node:process'
import { walk } from './walk.mjs'
import { getModuleName } from './getModuleName.mjs'
import {readFileSync } from 'node:fs'

let basePath = '/Demo'
let directory = `${process.env.INIT_CWD}${basePath}/`

// Search in local directory tree for matching .importmap
let findImportmaps = (directory) => 
    walk(directory, '*.importmap')

// Import external importmap at path
let getImportMap = (path) => {
    return JSON.parse(readFileSync(path));
} 

// Extract module names from importmap
let getModuleNames = (importmap) => 
    Object.keys(importmap.imports)

let files = findImportmaps(directory)
let firstImportmap = files[0]
let importmap = getImportMap(firstImportmap);
let modulesNames = getModuleNames(importmap)

console.log(modulesNames)




// Extract module name from browser entryPoint defined in package.json
let config = JSON.parse(readFileSync('package.json'));
let moduleName = getModuleName(config.browser)
