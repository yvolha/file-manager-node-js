import { createInterface } from 'node:readline';
import { stdin as input, stdout as output} from 'node:process';

import { printMagentaText } from '../utils/get-color-coded-text.js';
import { INVALID_INPUT_TEXT, PROMPT_TEXT } from '../utils/constants.js';
import username from './get-username.js';
import { getGoodbyeText } from '../utils/get-text.js';
import { handleCommand } from '../commands/handle-command.js';

const launchReadline = async () => {
    printMagentaText(PROMPT_TEXT);

    const rl = createInterface({ input, output });

    rl.on('line', async (input) => {
        if (input === '.exit') {
            printMagentaText(getGoodbyeText(username));
            rl.close();

        } else if (input.length > 0) {

            await handleCommand(input);
        } else {

            console.log(INVALID_INPUT_TEXT);
        }
    });
  
    rl.on('SIGINT', () => {
        printMagentaText(getGoodbyeText(username));
        rl.close();
    });
}

export default launchReadline;