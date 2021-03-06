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
        d="M12 7.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm0 6a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM10.25 18a1.75 1.75 0 103.5 0 1.75 1.75 0 00-3.5 0z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
