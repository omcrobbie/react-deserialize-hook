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
          className="container"
          style={{ border: "solid 1px blue", backgroundColor: "red" }}
        >
          <h1 align="center">
            <div style={{ border: "solid 1px red", backgroundColor: "blue" }}>
              Test
            </div>
          </h1>
        </Component>
      )
    );
  }, []);
  const { Tree, jsxString } = useSerializedComponents(serialized);
  console.log(jsxString);

  return <Tree />;
}
