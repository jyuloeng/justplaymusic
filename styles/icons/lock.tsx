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
        d="M12 2a4 4 0 014 4v2h2.5A1.5 1.5 0 0120 9.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 20.5v-11A1.5 1.5 0 015.5 8H8V6a4 4 0 014-4zm0 11.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 4a2 2 0 00-2 2v2h4V6a2 2 0 00-2-2z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
