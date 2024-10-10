import { DEFAULT_USERNAME_TEXT } from "./utils/constants.js";
import { printMagentaText } from "./utils/get-color-coded-text.js";
import { getGreetingText } from "./utils/get-text.js";

export const APP_STATE = {
    username: 'Username',
} 

function setUsername(){
    const nameArgIndex = 2;
    const nameArg = '--username';
    const nameValueArgSeparator = '=';

    console.log(process.argv[2], process.argv[3])

    const argNameAndValueCurrent = process.argv[nameArgIndex];

    if (!argNameAndValueCurrent) {
        printMagentaText(DEFAULT_USERNAME_TEXT);

        return;
    }

    const argNameCurrent = argNameAndValueCurrent.split(nameValueArgSeparator)[0];
    const argValueCurrent = argNameAndValueCurrent.split(nameValueArgSeparator)[1];

    if (
        !argNameCurrent 
        || !argValueCurrent 
        ||argNameCurrent !== nameArg 
    ) {
        printMagentaText(DEFAULT_USERNAME_TEXT);
    } else {
        APP_STATE.username = argValueCurrent;
    }

    
}

function startApp(){
    setUsername();

    printMagentaText(getGreetingText(APP_STATE.username));
} 

startApp();

console.log(APP_STATE.username, 'at the end');