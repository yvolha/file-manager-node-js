import {createInterface} from 'node:readline';
import { stdin, stdout } from 'node:process';

import { printMagentaText } from '../utils/get-color-coded-text.js';
import { PROMPT_TEXT } from '../utils/constants.js';
import username from './get-username.js';

const launchReadline = async () => {
    printMagentaText(PROMPT_TEXT);

  const rl = createInterface({ stdin, stdout });

  rl.on('line', async (stdin) => {
    if (stdin === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
    } else if (stdin.length > 0) {
      await handleCommand(stdin);
    } else {
      console.log('Invalid input.\n');
    }
  });
  
  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
  });
}

export default launchReadline;