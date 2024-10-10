import { join, parse } from 'path';
import { homedir } from 'os';
import { pathExists } from '../utils/check-access.js';
import { OPERATION_FAILED_TEXT } from '../utils/constants.js';

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
      
      if (!(await pathExists(interimPath))) {
        console.error(OPERATION_FAILED_TEXT);
        return;
      };

      currentDir = interimPath;

    } else {

      const interimPath = path.replace(/^["'](.+(?=["']$))["']$/, '$1');
      if (!(await pathExists(interimPath))) {
        console.log(OPERATION_FAILED_TEXT);
        return;
      };

      currentDir = interimPath;
    }
  }

  return currentDir;
}