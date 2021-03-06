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
        d="M12.82 5.58l-.82.822-.824-.823a5.375 5.375 0 00-7.602 7.601l7.896 7.896a.75.75 0 001.06 0l7.902-7.897a5.38 5.38 0 00-7.612-7.6z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
