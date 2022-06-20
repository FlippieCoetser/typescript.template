import { writeFile } from 'fs';

export let htmlTemplate = `
<!doctype html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>`

export const createHTMLFile = (path, html) => writeFile(`${path}`, html, (err) => { err && console.log(err) })
