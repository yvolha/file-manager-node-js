import os from 'node:os';

import { printGreenText } from "../../utils/get-color-coded-text.js";
import { INVALID_INPUT_TEXT } from '../../utils/constants.js';

export default async function handleOsCommand (argument) {
    switch (argument) {
        case '--EOL':
            cmdEOL();
            break;
        case '--cpus':
            cmdCPUs();
            break;
        case '--homedir':
            cmdHomerdir();
            break;
        case '--username':
            cmdUserInfo();
            break;
        case '--architecture':
            cmdArchitecture();
            break;
        default:
            console.error(INVALID_INPUT_TEXT);
    }
}

/* OS commands */

function cmdEOL(){
    printGreenText(`Default system EOL is ${JSON.stringify(os.EOL)}.`)
}

function cmdCPUs(){
    const cpus = os.cpus();

    printGreenText(`CPUs info:
        CPUs amount: ${JSON.stringify(cpus.length)}
        CPUs model: ${cpus[0].model.trim()}
        CPUs clock rate: ${JSON.stringify(cpus[0].speed/1000)} GHz\n`)
}

function cmdHomerdir(){
    printGreenText(`The home directory is ${JSON.stringify(os.homedir())}.\n`)
}

function cmdUserInfo(){
    printGreenText(`The current System Username is ${os.userInfo().username}.\n`)
}

function cmdArchitecture(){
    printGreenText(`The current CPU architecture for which Node.JS binary has compiled is ${os.arch()}.\n`)
}