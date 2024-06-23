import { Suspense, useEffect, useMemo, useState } from "react";
import renderToString from "./renderToString";
import { deserialize } from "./serialize";

export const useSerializedComponents = (serialized?: string) => {
  const [jsxString, setJsxString] = useState<string>();
  const deserialized = useMemo(() => {
    if (serialized) {
      return deserialize(serialized);
    }
  }, [serialized]);
  const Tree = useMemo(
    () => () => <Suspense>{deserialized}</Suspense>,
    [deserialized]
  );
  useEffect(() => {
    renderToString(<Tree />).then((val) => setJsxString(val));
  }, [Tree]);
  return { jsxString, Tree };
};
