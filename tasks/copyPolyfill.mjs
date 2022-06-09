import process from 'node:process'
import { walk } from './walk.mjs'

import { copyFile } from 'node:fs/promises'

let basePath = ''
let directory = `${process.env.INIT_CWD}${basePath}/`

let directoriesWithImportmap = (directory) =>
    walk(directory, '*.importmap')
    .map(file => file.replace(/[^/]*$/,''))

let directories = directoriesWithImportmap(directory)

let copyExtImportmapPolyfill = async (directories) => {
    directories.forEach( async directory => {
        await copyFile(`./importmap/importmap.js`, `${directory}importmap.js`);
    })
}

copyExtImportmapPolyfill(directories)

// import importmap 
//check if module defined, if not create