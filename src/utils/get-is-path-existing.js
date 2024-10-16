import { stat } from "fs/promises";

export async function getIsPathExisting (str) {
    return await stat(str)
        .then(() => true)
        .catch(() => false);
} 