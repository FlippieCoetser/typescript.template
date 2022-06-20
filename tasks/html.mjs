import { walk } from "./walk.mjs"
import { createHTMLFile, htmlTemplate } from './createHTML.mjs';
import { readdirSync } from 'node:fs'

// Utility functions
const filterDirectoriesByMatchingPath = (pattern, directories) =>
    directories.filter(directory => directory === pattern)

const filterDirectoriesForMatchingString = (directories, value) => 
    directories.filter(directory => directory.includes(value))

const findHtmlFiles = (directory) => walk(directory, '*.html')

const basePath = ''
const rootPath = `${process.env.INIT_CWD}${basePath}/`

export const getTargetHtmlPath = (path) => {
    const htmlFiles = findHtmlFiles(path)
    const htmlFilesPath = htmlFiles.map(file => file.replace(/[^/]*$/,''))

    const rootPathContainsHTMLFiles = 
        filterDirectoriesByMatchingPath(`${path}`, htmlFilesPath)?.length === 0 ? false : true

    let htmlPath = rootPathContainsHTMLFiles ? path : undefined

    if (!rootPathContainsHTMLFiles) { 
        htmlPath = ['demo','app','dist','lib']
            .map(path => filterDirectoriesForMatchingString(htmlFilesPath, path)
                .filter( path => !path.match(/\/node_modules\//)))
            .flat(2)
            .find(path => path.length > 0)
    }

    htmlPath === undefined && createHTMLFile(`${rootPath}/index.html`, htmlTemplate)
    htmlPath === undefined && (htmlPath = rootPath)


    const file = readdirSync(htmlPath, {withFileTypes: true})
        .filter(item => item.isFile())
        .filter(file => file.name.match(/\.html$/))
        .map(file => file.name)
        .find(file => file.length > 0)

    return `${htmlPath}${file}`
}

