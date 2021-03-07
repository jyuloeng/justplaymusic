import * as React from "react";
import { LightModeTextColor } from "../colors";
import { SvgProps } from "./index";

function SvgComponent(props: SvgProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.704 3.442c.191.226.296.512.296.808v15.502a1.25 1.25 0 01-2.058.954L7.975 16.5H4.25A2.25 2.25 0 012 14.25v-4.5A2.25 2.25 0 014.25 7.5h3.725l4.968-4.204a1.25 1.25 0 011.761.147zm2.4 5.198a.75.75 0 011.03.25c.574.94.862 1.992.862 3.14 0 1.149-.288 2.201-.862 3.141a.75.75 0 11-1.28-.781c.428-.702.642-1.483.642-2.36 0-.876-.214-1.657-.642-2.359a.75.75 0 01.25-1.03z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
