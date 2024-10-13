import path from 'path';
import { createReadStream } from 'fs';

import { getCurrentDir } from "../../components/get-current-dir.js";
import { getIsPathExisting } from "../../utils/get-is-path-existing.js";

export async function cmdCat (fileName) {
    const currentDir = await getCurrentDir();
    const filePath = path.join(currentDir, fileName);

    if (!(await getIsPathExisting(filePath))) {
        throw new Error;
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