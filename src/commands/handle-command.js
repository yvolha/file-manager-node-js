import { getCurrentDir } from "../components/get-current-dir.js";
import { INVALID_INPUT_TEXT, PROMPT_TEXT } from "../utils/constants.js";
import { printMagentaText } from "../utils/get-color-coded-text.js";
import { cmdCompress, cmdDecompress } from "./compression/compression-handler.js";
import { 
    cmdAdd, 
    cmdCat, 
    cmdCpMv, 
    cmdRm, 
    cmdRn,
} from "./file-operations/file-operation-handler.js";
import { cmdHash } from "./hash/hash-handler.js";
import { cmdCd, cmdLs, cmdUp } from "./navigation/navigation-handlers.js";
import handleOsCommand from "./os/os-handler.js";

export async function handleCommand (input) {
    try {
        const commandBase = input.split(' ')[0];
        const commandArgs = input.toString().trim().split(' ').slice(1).filter(e => e);
    
        switch (commandBase) {
            /* Navigation commands */
            case 'ls':
                await cmdLs(await getCurrentDir());
                break;
            case 'up':
                await cmdUp();
                break;
            case 'cd':
                await cmdCd(commandArgs[0]);
                break;

            /* File operations commands */
            case 'cat':
                await cmdCat(commandArgs[0]);
                break;
            case 'add':
                await cmdAdd(commandArgs[0]);
                break;
            case 'rn':
                await cmdRn(commandArgs[0], commandArgs[1]);
                break;
            case 'cp':
                await cmdCpMv(commandArgs[0], commandArgs[1]);
                break;
            case 'mv':
                await cmdCpMv(commandArgs[0], commandArgs[1], true);
                break;
            case 'rm':
                await cmdRm(commandArgs[0]);
                break;

            /* Hash commands */
            case 'hash':
                await cmdHash(commandArgs[0]);
                break;

            /* Compression commands */
            case 'compress':
                await cmdCompress(commandArgs[0], commandArgs[1]);
                break;
            case 'decompress':
                await cmdDecompress(commandArgs[0], commandArgs[1]);
                break;

            /* OS commands */
            case 'os':
                handleOsCommand(commandArgs[0]);
                break;

            default: 
                console.error(INVALID_INPUT_TEXT);
                break;
        }

    } catch (e) {
        console.error(INVALID_INPUT_TEXT);
    }
    

    
    setTimeout(async () => {
        console.log(`Your current directory is \x1b[32m${await getCurrentDir()}\x1b[0m\n`);
        printMagentaText(PROMPT_TEXT)
    }, 600); 
}