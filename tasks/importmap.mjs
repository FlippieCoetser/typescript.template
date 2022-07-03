import { template } from "./createImportMapping.mjs"

const findImportmapStartPositionInTokenizedHtml = (htmlTokens) =>
    htmlTokens
        .findIndex(line => line.match(/.*<script.*type="importmap".*>.*/))

const findImportmapEndPosition = (htmlTokens) =>
    htmlTokens
        .findIndex(line => line.match(/.*<\/script>.*/))

const deleteHtmlTokensBeforeImportmap = (htmlTokens, start) => htmlTokens.splice(start)
const deleteHtmlTokensAfterImportmap = (htmlTokens, end) => htmlTokens.splice(0, end+1)

const tokenizedHtmlContainsImportmap = (htmlTokens) => 
    findImportmapStartPositionInTokenizedHtml(htmlTokens) === -1 ? false : true

const extractImportmapFromTokenizedHtml = (htmlTokens) => {
    let importmap = null
    
    const start = findImportmapStartPositionInTokenizedHtml(htmlTokens)
    importmap = deleteHtmlTokensBeforeImportmap(htmlTokens, start)

    const end = findImportmapEndPosition(importmap)
    importmap = deleteHtmlTokensAfterImportmap(importmap, end)

    importmap.shift()
    importmap.pop()

    importmap = JSON.parse(importmap.join("\r\n")).imports
    
    return importmap
}

export const htmlContainsImportmap = (html) => tokenizedHtmlContainsImportmap(html.split(/\r?\n/))
export const extractImportmapFromHtml = (html) => extractImportmapFromTokenizedHtml(html.split(/\r?\n/))

export const getImportmap = (html) => !htmlContainsImportmap(html) ? template : extractImportmapFromHtml(html)


export const addMappingForModule = (importmap, module, depth) => {
    if (depth === 0) {
        importmap[Object.keys(module)] = module[Object.keys(module)]
    } else {
        importmap[Object.keys(module)] = '.' + module[Object.keys(module)]
    } 
    return importmap
}

const findImportmapEndAfterStartPosition = (htmlTokens, position) => {
    let end = 0
    htmlTokens.forEach((element, index) => {
        if(index >= position ) {
            if (end === 0) {
                let isCloseScriptToken = element.includes('</script>')
                isCloseScriptToken && (end = index)
            }
            
        }
    })
    return end
}

let removeSectionFromHtml = (htmlTokens, start, end ) => 
    htmlTokens
        .map((element, index)=> index >= start && index <= end ? '': element)
        .filter(token => token !== '' ? true : false)

let removeImportmapFromHtml = (htmlTokens) => {
    const start = findImportmapStartPositionInTokenizedHtml(htmlTokens)
    const end = findImportmapEndAfterStartPosition(htmlTokens, start)
    return removeSectionFromHtml(htmlTokens, start, end)
}

const findHeadEndPosition = (htmlTokens) =>
    htmlTokens
        .findIndex(line => line.match(/.*<\/head>.*/))

const findFirstScriptPositionBeforePosition = (htmlTokens, position) => {
            let firstScript = 0
            htmlTokens.forEach((element, index) => {
                if(index < position ) {
                    if (firstScript === 0) {
                        let isOpenScriptToken = element.includes('<script')
                        isOpenScriptToken && (firstScript = index)
                    }
                    
                }
            })
            return firstScript
        }

const htmlContainsScriptInHead = (htmlTokens) => 
    findFirstScriptPositionBeforePosition(htmlTokens,findHeadEndPosition(htmlTokens)) !== 0 ? true: false

const identifyImportmapStartPosition = (htmlTokens) =>
    htmlContainsScriptInHead(htmlTokens) ? 
    findFirstScriptPositionBeforePosition(htmlTokens,findHeadEndPosition(htmlTokens)) : 
    findHeadEndPosition(htmlTokens)

const getHeadEnd = (htmlTokens) => 
    htmlTokens
        .filter((element, index) => index === findHeadEndPosition(htmlTokens) ? true : false)

const identifySpacing = (htmlTokens) => (
    getHeadEnd(htmlTokens)[0].length - 
    getHeadEnd(htmlTokens).map(element => element.replaceAll(' ',''))[0].length
)

const generateImportmap = (maps, htmlSpacing) => { 
    let importmap = 
        JSON
            .stringify({
                imports: maps
                }, null, htmlSpacing)
            .split(/\r?\n/)
            .map(element => " ".repeat(htmlSpacing * 3) + element)
            
    importmap.unshift(" ".repeat(htmlSpacing * 2) + '<script type="importmap">')
    importmap.push(" ".repeat(htmlSpacing * 2) + '</script>')

    return importmap
}

export const insertImportmapIntoHtml = (maps, html) => {
    const htmlTokens = html.split(/\r?\n/)
    let updatedHtmlTokens = htmlTokens

    const importmapInHtmlFile = tokenizedHtmlContainsImportmap(htmlTokens)

    if(importmapInHtmlFile) {
        updatedHtmlTokens = removeImportmapFromHtml(htmlTokens)
    }

    const startPosition = identifyImportmapStartPosition(updatedHtmlTokens) 

    const htmlSpacing = identifySpacing(updatedHtmlTokens)

    const importmap = generateImportmap(maps, htmlSpacing)

    updatedHtmlTokens.splice(startPosition, 0, importmap)

    return updatedHtmlTokens.flat(2).join("\r\n")
}