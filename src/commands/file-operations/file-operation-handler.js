import path from 'path';
import { 
    access, 
    createReadStream, 
    createWriteStream, 
    rename,
    writeFile,
 } from 'fs';

 import { unlink } from 'node:fs/promises';
import { getCurrentDir } from "../../components/get-current-dir.js";
import { getIsPathExisting } from "../../utils/get-is-path-existing.js";
import { OPERATION_FAILED_TEXT } from '../../utils/constants.js';
import { pipeline } from 'node:stream/promises';

export async function cmdCat (fileName) {
    const currentDir = await getCurrentDir();
    const filePath = path.join(currentDir, fileName);

    if (!(await getIsPathExisting(filePath))) {
        console.error(OPERATION_FAILED_TEXT);
        return;
    }

    const readStream = createReadStream(filePath);

    let data = '';
    readStream.on('data', (chunk) => {
        data += chunk;
    });
    readStream.on('end', () => {
        process.stdout.write(data + '\n\n');
    })
}

export async function cmdAdd (fileName) {
    const currentDir = await getCurrentDir();
    const filePath = path.join(currentDir, fileName);

    writeFile(
        filePath, 
        '',
        { flag: 'wx' }, 
        (err) => {
            if (err) {
                console.error(OPERATION_FAILED_TEXT);
            }
        },
    );
}

export async function cmdRn (previousName, newName) {
    const currentDir = await getCurrentDir();

    const previousPath = path.join(currentDir, previousName);
    const newPath = path.join(currentDir, newName);

    access(
        newPath, 
        (err) => {
            if (!err) {
                console.error(OPERATION_FAILED_TEXT);
            }

            rename(
                previousPath, 
                newPath,
                (err) => {
                    if (err) {
                        console.error(OPERATION_FAILED_TEXT);
                    }
                },
            )
        }
    )
}

export async function cmdCpMv (fileName, dirPath = '', isMove ) {
    const currentDir = await getCurrentDir();
    const currentFilePath = path.join(currentDir, fileName);
  
    if (await getIsPathExisting(currentFilePath)){
        const { base } = path.parse(currentFilePath);
        const newFilePath = path.join(currentDir, dirPath, base);

        if (await getIsPathExisting(newFilePath)){
            console.log('here')
            console.error(OPERATION_FAILED_TEXT);
            return;
        }

        const readableStream = createReadStream(currentFilePath);
        const writeableStream = createWriteStream(newFilePath);

        await pipeline(readableStream, writeableStream)
            .then(() => {
                if (isMove) {
                    unlink(currentFilePath);
                }
            });

    } else {
        console.error(OPERATION_FAILED_TEXT);
    }
  }

  export async function cmdRm (filePath) {
    const currentDir = await getCurrentDir();
    const currentFilePath = path.join(currentDir, filePath);

    if (await getIsPathExisting(currentFilePath)){
        unlink(currentFilePath);

    } else {
        console.error(OPERATION_FAILED_TEXT);
    }
  }