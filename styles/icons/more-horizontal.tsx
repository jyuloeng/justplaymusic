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
        d="M7.75 12a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0zm6 0a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0zM18 13.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
