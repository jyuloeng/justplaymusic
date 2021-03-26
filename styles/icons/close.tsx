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
        d="M4.21 4.387l.083-.094a1 1 0 011.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 111.414 1.414L13.415 12l6.292 6.293a1 1 0 01.083 1.32l-.083.094a1 1 0 01-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 01-1.414-1.414L10.585 12 4.293 5.707a1 1 0 01-.083-1.32l.083-.094-.083.094z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
