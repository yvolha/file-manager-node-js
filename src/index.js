import { getCurrentDir } from "./components/get-current-dir.js";
import username from "./components/get-username.js";
import launchReadline from "./components/launch-readline.js";
import { printMagentaText } from "./utils/get-color-coded-text.js";
import { getGreetingText } from "./utils/get-text.js";

async function startApp(){
    printMagentaText(getGreetingText(username));
    console.log(`Your current directory is \x1b[32m${await getCurrentDir()}\x1b[0m\n`);

    launchReadline();

} 

startApp();
