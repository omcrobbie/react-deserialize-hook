import { omit } from "lodash";
import React, { PropsWithChildren } from "react";
import { ComponentPropTypes } from "../util/types";

type Props = ComponentPropTypes &
  PropsWithChildren &
  React.ComponentProps<"div">;

export default function Component(props: Props) {
  const { children, ...elemProps } = omit<Props>(props, "name", "type");
  return <div {...elemProps}>{children}</div>;
}
