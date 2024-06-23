import { useEffect, useState } from "react";
import Component from "./components/Component";
import { serialize } from "./util/serialize";
import { useSerializedComponents } from "./util/useSerializedComponents";

export default function App() {
  const [serialized, setSerialized] = useState<string>();
  useEffect(() => {
    setSerialized(
      serialize(
        <Component
          name="Test1"
          type="Component"
          className="container"
          style={{ border: "solid 1px blue", backgroundColor: "red" }}
        >
          <h1 align="center">
            <Component
              name="Test2"
              type="Component"
              style={{ border: "solid 1px red", backgroundColor: "blue" }}
            >
              Test
            </Component>
          </h1>
        </Component>
      )
    );
  }, []);
  const { Tree } = useSerializedComponents(serialized);

  return <Tree />;
}
