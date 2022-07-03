import { getTargetHtmlPath } from './html.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
import { getImportmap, addMappingForModule, insertImportmapIntoHtml } from './importmap.mjs'
import { template } from './createImportMapping.mjs'
import { log } from './logger.mjs'

const basePath = ''
const rootPath = `${process.env.INIT_CWD}${basePath}/`

// HTML
// get target html file path, if no html found create new html file in root and return path
const targetHtmlPath = getTargetHtmlPath(rootPath)
log(`Importmap Injection: Html Target Identified: ${targetHtmlPath}`)

// extract importmap in html file, if no importmap found create new importmap 
const html = readFileSync(`${targetHtmlPath}`, 'utf8')
let importmap = getImportmap(html)
log(`Importmap Injection: Importmap extracted or template importmap returned`)

// add or update importmap using current module metadata 
const depth = (targetHtmlPath.replace(rootPath, '').match(/\//g) || []).length
importmap = addMappingForModule(importmap, template, depth)
log(`Importmap Injection: Mapping for module map updated or added to importmap`)

// Update by first removing existing followed by updating and reinserting importmap
const updatedHtml = insertImportmapIntoHtml(importmap, html)
log(`Importmap Injection: Importmap injected into in-memory html`)

// Override existing html file with updated version
let replaceHtmlFile = (file, contents) => writeFileSync(file, contents)
replaceHtmlFile(targetHtmlPath, updatedHtml)
log(`Importmap Injection: In-memory html persisted to local storage`)