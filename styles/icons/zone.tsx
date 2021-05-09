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
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9.5 8.25a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM8.875 12h6.25C16.16 12 17 12.84 17 13.875c0 1.395-.574 2.513-1.515 3.268-.927.744-2.169 1.107-3.485 1.107-1.316 0-2.558-.363-3.485-1.107C7.574 16.389 7 15.27 7 13.875 7 12.839 7.84 12 8.875 12z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
