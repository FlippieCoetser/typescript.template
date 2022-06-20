import { appendFileSync } from 'node:fs'

const basePath = ''
const rootPath = `${process.env.INIT_CWD}${basePath}/`

export const log = (message) => appendFileSync(`${rootPath}log.txt`,`${message} \r\n`)
