import { getCurrentDir } from "../components/get-current-dir.js";
import { INVALID_INPUT_TEXT, PROMPT_TEXT } from "../utils/constants.js";
import { printMagentaText } from "../utils/get-color-coded-text.js";
import { cmdLs } from "./navigation/navigation-handlers.js";
import handleOsCommand from "./os/os-handler.js";

export async function handleCommand (input) {
    try {
        const commandBase = input.split(' ')[0];
        const commandArgs = input.toString().trim().split(' ').slice(1).filter(e => e);
    
        switch (commandBase) {
            case 'ls':
                await cmdLs(await getCurrentDir());
                break;

            case 'os':
                handleOsCommand(commandArgs[0]);
                break;
        }
    } catch {
        console.error(INVALID_INPUT_TEXT);
    }
    

    console.log(`Your current directory is \x1b[32m${await getCurrentDir()}\x1b[0m\n`);
    printMagentaText(PROMPT_TEXT);
}