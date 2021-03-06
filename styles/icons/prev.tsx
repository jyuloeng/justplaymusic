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
        d="M2.75 20a1 1 0 102 0V4a1 1 0 10-2 0v16zm18-.947c0 1.424-1.612 2.252-2.77 1.422L7.51 12.968a1.75 1.75 0 01.075-2.895l10.47-6.716c1.165-.748 2.695.089 2.695 1.473v14.223z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
