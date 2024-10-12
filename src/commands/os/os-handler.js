import os from 'node:os';

import { printGreenText } from "../../utils/get-color-coded-text.js";
import { INVALID_INPUT_TEXT } from '../../utils/constants.js';

export default async function handleOsCommand (argument) {
    // console.log(argument);

    switch (argument) {
        case '--EOL':
            await cmdEOL();
            break;
        default:
            console.error(INVALID_INPUT_TEXT);
    }
}

/* OS commands */

async function cmdEOL(){
    printGreenText(`Default system EOL is ${JSON.stringify(os.EOL)}.`)
}