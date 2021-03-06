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
        d="M5.746 3a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 001.75-1.75V4.75A1.75 1.75 0 009.246 3h-3.5zm9 0a1.75 1.75 0 00-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 001.75-1.75V4.75A1.75 1.75 0 0018.246 3h-3.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
