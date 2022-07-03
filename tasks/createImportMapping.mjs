import {readFileSync } from 'node:fs'

// read package.json
const getPackage = () => JSON.parse(readFileSync('package.json'))

// extract importmap key from package.json browser field
// construct value using package.json name and browser field
const createImportmap = ({ name, browser}) => 
    JSON.parse(`{"${ name }" : "${`./node_modules/${name}/${browser}`}"}`)

export const template = createImportmap(getPackage())
