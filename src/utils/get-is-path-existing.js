import { stat } from "fs/promises";

export async function getIsPathExisting (str) {
    await stat(str)
        .then(() => true)
        .catch(() => false);
} 