import process from 'node:process'
import { walk } from './walk.mjs'
import { copyFile } from 'node:fs/promises'

let basePath = '/Demo'
let directory = `${process.env.INIT_CWD}${basePath}/`

let findImportmap = (directory) => 
    walk(directory, '*.importmap')

let importMaps = findImportmap(directory)
