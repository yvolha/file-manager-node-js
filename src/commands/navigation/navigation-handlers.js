import { readdir } from 'fs/promises';
import { OPERATION_FAILED_TEXT } from '../../utils/constants.js';

const TYPE_DIRECTORY = 'directory';
const TYPE_FILE = 'file';

export const cmdLs = async (directory) => {
    console.log(directory);
  const items = await readdir(directory, {
    withFileTypes: true,
  })
  .catch(() => console.error(OPERATION_FAILED_TEXT));

  console.log(items);

  const typedItems = await Promise.all(items
  .map(item => ({
    Name: item.name,
    Type: item.isDirectory() ? TYPE_DIRECTORY : TYPE_FILE,
  }))
  .sort((a, b) => {
    if (a.Type > b.Type) {
      return 1;
    }
    if (a.Type < b.Type) {
      return -1;
    }
    return 0;
  }))

  console.table(typedItems);
}
