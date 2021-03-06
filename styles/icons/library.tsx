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
        d="M5.5 3A1.5 1.5 0 017 4.5v15A1.5 1.5 0 015.5 21h-2A1.5 1.5 0 012 19.5v-15A1.5 1.5 0 013.5 3h2zm6 0A1.5 1.5 0 0113 4.5v15a1.5 1.5 0 01-1.5 1.5h-2A1.5 1.5 0 018 19.5v-15A1.5 1.5 0 019.5 3h2zm7.281 3.124l3.214 12.519a1.5 1.5 0 01-1.08 1.826l-1.876.48a1.5 1.5 0 01-1.826-1.08L13.999 7.354a1.5 1.5 0 011.08-1.826l1.876-.483a1.502 1.502 0 011.826 1.08z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
