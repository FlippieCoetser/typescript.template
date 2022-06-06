import { readdirSync } from 'node:fs'

let globingToRegex = pattern =>
    new RegExp(pattern
        .padEnd(1,'$')
        .replace('.', '[\.]')
        .replace('*', '.*'))

let isMatch = (filename, filePattern) => 
    filename.match(globingToRegex(filePattern)) == null ? false : true

export let walk = (node,pattern) => {
    const files = []

    const items = readdirSync(node, {withFileTypes: true})

    items.forEach(item => {
        const path = `${node}${item.name}`

        try {
            if(item.isFile()) {
                if(isMatch(item.name, pattern)) {
                    files.push(path)
                }
            } else { 
                let subFolder = walk(`${path}/`, pattern)
                files.push(...subFolder)
            }
        } catch (error) {
            console.log(error)
        }
    })
    return files
}