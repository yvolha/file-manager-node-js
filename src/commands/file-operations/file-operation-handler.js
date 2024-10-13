import path from 'path';
import { createReadStream, writeFile } from 'fs';

import { getCurrentDir } from "../../components/get-current-dir.js";
import { getIsPathExisting } from "../../utils/get-is-path-existing.js";
import { OPERATION_FAILED_TEXT } from '../../utils/constants.js';

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