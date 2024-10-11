import { DEFAULT_USERNAME_TEXT } from "../utils/constants.js";
import { printYellowText } from "../utils/get-color-coded-text.js";

let username = 'Username';

export function getUsername(){
    const nameArg = '--username';
    const nameValueArgSeparator = '=';

    const argNameAndValueCurrent = process.argv.find(arg => arg.startsWith(nameArg));

    if (!argNameAndValueCurrent) {
        printYellowText(DEFAULT_USERNAME_TEXT);

        return;
    }

    const argNameCurrent = argNameAndValueCurrent.split(nameValueArgSeparator)[0];
    const argValueCurrent = argNameAndValueCurrent.split(nameValueArgSeparator)[1];

    if (
        !argNameCurrent 
        || !argValueCurrent 
        ||argNameCurrent !== nameArg 
    ) {
        printYellowText(DEFAULT_USERNAME_TEXT);
    } else {
        username = argValueCurrent;
    }
}

getUsername()

export default username;