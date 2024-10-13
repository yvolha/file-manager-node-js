import { createHash } from "crypto";
import path from 'path';

import { OPERATION_FAILED_TEXT } from "../../utils/constants.js";
import { getIsPathExisting } from "../../utils/get-is-path-existing.js";
import { getCurrentDir } from "../../components/get-current-dir.js";
import { createReadableStream } from "../../utils/create-readable-stream.js";


export async function cmdHash (filePath) {
    const currentDir = await getCurrentDir();
    const currentFilePath = path.join(currentDir, filePath);

    if (await getIsPathExisting(currentFilePath)){
        
        await createReadableStream(currentFilePath)
            .then((data) => {
                console.log(createHash("sha256")
                .update(data)
                .digest("hex"))
            })
        
    } else {
        console.error(OPERATION_FAILED_TEXT);
    }
}