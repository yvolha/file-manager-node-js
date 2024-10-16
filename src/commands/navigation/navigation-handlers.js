import { readdir } from 'fs/promises';
import { OPERATION_FAILED_TEXT } from '../../utils/constants.js';
import { getCurrentDir } from '../../components/get-current-dir.js';

const TYPE_DIRECTORY = 'directory';
const TYPE_FILE = 'file';

export const cmdLs = async (directory) => {
  const items = await readdir(directory, {
    withFileTypes: true,
  })
    .catch(() => console.error(OPERATION_FAILED_TEXT));

  const typedItems = await Promise.all(items
    .map(item => ({
        Name: item.name,
        Type: item.isDirectory() ? TYPE_DIRECTORY : TYPE_FILE,
    }))
    .sort((a, b) => a.Type.localeCompare(b.Type)))

  console.table(typedItems);
}

export const cmdUp = async () => {
    await getCurrentDir('up');
}

export const cmdCd = async (newPath) => {
    await getCurrentDir(newPath.toString().trim());
}
