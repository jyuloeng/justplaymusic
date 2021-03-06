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
        d="M21 4a1 1 0 10-2 0v16a1 1 0 102 0V4zM3 4.947c0-1.424 1.612-2.252 2.77-1.422l10.47 7.507a1.75 1.75 0 01-.075 2.895l-10.47 6.716C4.53 21.39 3 20.554 3 19.17V4.947z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
