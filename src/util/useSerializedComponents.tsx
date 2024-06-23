import * as babelPlugin from "prettier/parser-babel";
import * as estreePlugin from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { deserialize } from "./serialize";

export const useSerializedComponents = (serialized?: string) => {
  const [jsxString, setJsxString] = useState<string>();
  const { element, name } = useMemo(() => {
    if (serialized) {
      return deserialize(serialized);
    }
    return { element: undefined, name: undefined };
  }, [serialized]);
  const Tree = useMemo(() => () => <>{element}</>, [element]);
  useEffect(() => {
    if (Tree && name) {
      const str = renderToString(<Tree />);
      //@ts-expect-error: browserify method on window object
      const body = window.convert(str);
      addHeadername(name, body).then(setJsxString);
    }
  }, [Tree, name]);
  return { jsxString, Tree };
};

function addHeadername(name: string, body: string) {
  const str = `export function ${name}() { return (${body})}`;
  return prettier.format(str, {
    parser: "babel",
    bracketSameLine: true,
    plugins: [babelPlugin, estreePlugin],
  });
}
