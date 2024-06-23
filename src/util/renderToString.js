import { renderToReadableStream } from "react-dom/server";
export default async function renderToString(children) {
  const stream = await renderToReadableStream(children);
  await stream.allReady;
  return readableStreamToString(stream);
}
async function readableStreamToString(readableStream) {
  const reader = readableStream.getReader();
  const decoder = new TextDecoder();
  try {
    let result = "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return processReturnString(result);
      }
      result += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

function processReturnString(val) {
  const v = /^<!--\$-->(.*)<!--\/\$-->$/.exec(val);
  if (v && v.length) {
    return window.convert(v[1]);
  }
}
