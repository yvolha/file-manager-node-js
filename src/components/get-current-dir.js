import { join, parse } from 'path';
import { homedir } from 'os';
import { OPERATION_FAILED_TEXT } from '../utils/constants.js';
import { getIsPathExisting } from '../utils/get-is-path-existing.js';

const homeDir = homedir();
const rootDir = parse(process.cwd()).root;
let currentDir = null;

export const getCurrentDir = async (path) => {
  if (currentDir === null) {
    currentDir = homeDir;
  }
  
  if (path === 'up') {

    if (currentDir === rootDir) return;
    currentDir = join(currentDir, '..');

  } else if (typeof path === 'string') {

    if (path.startsWith('.')) {
      const interimPath = join(currentDir, path.replace(/^["'](.+(?=["']$))["']$/, '$1'));
      
      if (!(await getIsPathExisting(interimPath))) {
        console.error(OPERATION_FAILED_TEXT);

        return;
      };

      currentDir = interimPath;

    } else {

      const interimPath = path.replace(/^["'](.+(?=["']$))["']$/, '$1');
      if (!(await getIsPathExisting(interimPath))) {
        console.log(OPERATION_FAILED_TEXT);

        return;
      };

      currentDir = interimPath;
    }
  }

  return `Your current directory is \x1b[32m${currentDir}\x1b[0m\n`;
}