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
        d="M10 2.5a7.5 7.5 0 015.964 12.048l4.743 4.745a1 1 0 01-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1110 2.5zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
