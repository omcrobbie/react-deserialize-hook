import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { deserialize } from "./serialize";

export const useSerializedComponents = (serialized?: string) => {
  const [jsxString, setJsxString] = useState<string>();
  const deserialized = useMemo(() => {
    if (serialized) {
      return deserialize(serialized);
    }
  }, [serialized]);
  const Tree = useMemo(() => () => <>{deserialized}</>, [deserialized]);
  useEffect(() => {
    const str = renderToString(<Tree />);
    setJsxString(window.convert(str));
  }, [Tree]);
  return { jsxString, Tree };
};
