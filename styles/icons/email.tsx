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
        d="M22 8.608v8.142a3.25 3.25 0 01-3.066 3.245L18.75 20H5.25a3.25 3.25 0 01-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 00.696 0L22 8.608zM5.25 4h13.5a3.25 3.25 0 013.234 2.924L12 12.154l-9.984-5.23a3.25 3.25 0 013.048-2.919L5.25 4h13.5-13.5z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
