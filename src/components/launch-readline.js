import {createInterface} from 'node:readline';
import { stdin, stdout } from 'node:process';

import { userName } from './username.js';
import handleCommand from './command-handler.js';

const launchReadline = async () => {
  console.log('Please type your command.\n');

  const rl = createInterface({ stdin, output });

  rl.on('line', async (stdin) => {
    if (stdin === '.exit') {
      console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
      rl.close();
    } else if (stdin.length > 0) {
      await handleCommand(stdin);
    } else {
      console.log('Invalid input.\n');
    }
  });
  
  rl.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
  });
}

export default launchReadline;