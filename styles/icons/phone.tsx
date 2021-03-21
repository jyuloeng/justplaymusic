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
        d="M15.75 2A2.25 2.25 0 0118 4.25v15.5A2.25 2.25 0 0115.75 22h-7.5A2.25 2.25 0 016 19.75V4.25A2.25 2.25 0 018.25 2h7.5zm-2.5 16h-2.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
