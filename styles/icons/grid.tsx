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
        d="M8.75 13A2.25 2.25 0 0111 15.25v3.5A2.25 2.25 0 018.75 21h-3.5A2.25 2.25 0 013 18.75v-3.5A2.25 2.25 0 015.25 13h3.5zm10 0A2.25 2.25 0 0121 15.25v3.5A2.25 2.25 0 0118.75 21h-3.5A2.25 2.25 0 0113 18.75v-3.5A2.25 2.25 0 0115.25 13h3.5zm-10-10A2.25 2.25 0 0111 5.25v3.5A2.25 2.25 0 018.75 11h-3.5A2.25 2.25 0 013 8.75v-3.5A2.25 2.25 0 015.25 3h3.5zm10 0A2.25 2.25 0 0121 5.25v3.5A2.25 2.25 0 0118.75 11h-3.5A2.25 2.25 0 0113 8.75v-3.5A2.25 2.25 0 0115.25 3h3.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
