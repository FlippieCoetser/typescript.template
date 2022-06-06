#! /usr/bin/env node

import { rm } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { exit } from 'node:process';

let getFilename = path => path.split('/').pop();
let getDirectory = path => path.replace(path.split('/').pop(), '');

let convertGlobingToRegex = pattern =>
    new RegExp(pattern
        .padEnd(1,'$')
        .replace('.', '[\.]')
        .replace('*', '.*'))

let matchingPattern = (filename, filePattern) => 
    filename.match(convertGlobingToRegex(filePattern)) == null ? false : true

// Delete matching file in specific folder
export default async input => {
    input.forEach(async signature => {
        let pattern = getFilename(signature);
        let directory = getDirectory(signature);

        !existsSync(directory) && exit(1)

        const items = await readdir(directory,{withFileTypes: true});

        items
            .filter(item => item.isFile())
            .map(file => file.name)
            .filter(file => matchingPattern(file, pattern))
            .forEach(async file => await rm(`${directory}${file}`)); 
    })
}