import { getCurrentDir } from "../components/get-current-dir.js";
import { INVALID_INPUT_TEXT, PROMPT_TEXT } from "../utils/constants.js";
import { printMagentaText } from "../utils/get-color-coded-text.js";
import { cmdCat } from "./file-operations/file-operation-handler.js";
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



            /* OS commands */
            case 'os':
                handleOsCommand(commandArgs[0]);
                break;
        }
    } catch (e) {
        console.log('CAUGHT SOMETHING', e)
        console.error(INVALID_INPUT_TEXT);
    }
    

    console.log(`Your current directory is \x1b[32m${await getCurrentDir()}\x1b[0m\n`);
    printMagentaText(PROMPT_TEXT);
}