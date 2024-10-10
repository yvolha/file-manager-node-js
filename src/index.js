import { getCurrentDir } from "./components/get-current-dir.js";
import { getUsername } from "./components/get-username.js";
import { NODE_WARNING } from "./utils/constants.js";
import { printBlueText, printMagentaText } from "./utils/get-color-coded-text.js";
import { getGreetingText } from "./utils/get-text.js";

async function startApp(){
    printBlueText(NODE_WARNING);

    const userName = getUsername();
    printMagentaText(getGreetingText(userName));

    console.log(await getCurrentDir());
} 

startApp();
