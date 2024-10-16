import {join, parse } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from "zlib";

import { OPERATION_FAILED_TEXT } from '../../utils/constants.js';
import { getIsPathExisting } from '../../utils/get-is-path-existing.js';
import { getCurrentDir } from '../../components/get-current-dir.js';

export async function cmdCompress (filePath, dirPath = '') {
    const currentDir = await getCurrentDir();
    const currentFilePath = join(currentDir, filePath);

    if (await getIsPathExisting(currentFilePath)){
        const { base } = parse(currentFilePath);

        const readableStream = createReadStream(currentFilePath, { encoding: "utf-8" });
        const writeableStream = createWriteStream(join(currentDir, dirPath, base + '.bz'));

        readableStream.pipe(createBrotliCompress()).pipe(writeableStream);

    } else {
        console.error(OPERATION_FAILED_TEXT);
    }

}

export async function cmdDecompress (filePath, dirPath = '') {

    const currentDir = await getCurrentDir();
    const currentFilePath = join(currentDir, filePath);

    if (await getIsPathExisting(currentFilePath)){
        const { base } = parse(currentFilePath);

        const readableStream = createReadStream(currentFilePath);
        const writeableStream = createWriteStream(join(currentDir, dirPath, base.slice(0, -3)));

        readableStream.pipe(createBrotliDecompress()).pipe(writeableStream);

    } else {
        console.error(OPERATION_FAILED_TEXT);
    }

}