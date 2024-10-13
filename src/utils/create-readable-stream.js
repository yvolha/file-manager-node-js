import { createReadStream } from "fs";

export async function createReadableStream (path) {
  const stream = createReadStream(path, 'utf-8');

  return new Promise((res, rej) => {
    stream.on('data', (data) => {res(data)});
    stream.on('error', (err) => rej(err));
  });
}
