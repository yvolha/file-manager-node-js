import { getUsername } from "./components/get-username.js";
import { NODE_WARNING } from "./utils/constants.js";
import { printBlueText, printMagentaText } from "./utils/get-color-coded-text.js";
import { getGreetingText } from "./utils/get-text.js";

function startApp(){
    printBlueText(NODE_WARNING);

    const userName = getUsername();
    printMagentaText(getGreetingText(userName));
} 

startApp();
