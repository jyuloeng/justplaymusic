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
        d="M9.5 5.25c0-1.243.507-2.25 1.75-2.25h1.5c1.243 0 1.75 1.007 1.75 2.25v15.77h-5V5.25zm-2 4.77H5.25A2.25 2.25 0 003 12.27v8c0 .414.336.75.75.75H7.5v-11zm9 11h3.75a.75.75 0 00.75-.75v-11a2.25 2.25 0 00-2.25-2.25H16.5v14z"
        fill={props.fill || LightModeTextColor}
      />
    </svg>
  );
}

export default SvgComponent;
