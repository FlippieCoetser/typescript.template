#! /usr/bin/env node
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const answer = await rl.question('Enter path to html document:');
console.log(`importmap lib copied into: ${answer}`);
rl.close();